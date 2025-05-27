import { useState, FormEvent, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  requestImage?: string | null;
  requestMetadata?: any | null;
  onClearRequest?: () => void;
}

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  request_type?: string;
  product_name?: string;
  request_metadata?: any;
  submission_date: string;
  formspree_submitted: boolean;
  has_attachment: boolean;
  image_storage_url?: string;
}

const ContactForm = ({ requestImage, requestMetadata, onClearRequest }: ContactFormProps) => {
  const { toast } = useToast();
  const [state, handleFormspreeSubmit] = useForm("mjkwqolq");
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: requestMetadata ? 'Parts Request' : '',
    message: requestMetadata ? `I'm interested in getting a quote for a part from ${requestMetadata.productName || 'your catalog'}.` : '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImageToStorage = async (imageDataUrl: string): Promise<string | null> => {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      
      // Generate unique filename
      const fileName = `part-request-${Date.now()}.png`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('part-requests')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: false
        });
      
      if (error) {
        console.error('Storage upload error:', error);
        return null;
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('part-requests')
        .getPublicUrl(fileName);
      
      console.log('Image uploaded to storage:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      return null;
    }
  };

  const saveToSupabase = async (submissionData: ContactSubmission): Promise<boolean> => {
    try {
      console.log('Attempting to save to Supabase:', submissionData);
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Supabase error:', error);
        return false;
      }

      console.log('Successfully saved to Supabase');
      return true;
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      return false;
    }
  };

  const submitToFormspree = async (formspreeData: FormData): Promise<boolean> => {
    try {
      console.log('Submitting to Formspree...');
      const response = await fetch('https://formspree.io/f/mjkwqolq', {
        method: 'POST',
        body: formspreeData,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Formspree response status:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Formspree submission error:', error);
      return false;
    }
  };

  const convertDataUrlToBlob = async (dataUrl: string): Promise<Blob | null> => {
    try {
      const response = await fetch(dataUrl);
      return await response.blob();
    } catch (error) {
      console.error('Error converting data URL to blob:', error);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Form submission started');
      console.log('Request image present:', !!requestImage);
      console.log('Request metadata:', requestMetadata);

      // Upload image to Supabase Storage if present
      let imageStorageUrl: string | null = null;
      if (requestImage) {
        console.log('Uploading image to Supabase Storage...');
        imageStorageUrl = await uploadImageToStorage(requestImage);
        if (imageStorageUrl) {
          console.log('Image uploaded successfully:', imageStorageUrl);
        } else {
          console.warn('Failed to upload image to storage, continuing without...');
        }
      }

      // Prepare data for Supabase
      const submissionData: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        submission_date: new Date().toISOString(),
        formspree_submitted: false,
        has_attachment: !!requestImage,
        image_storage_url: imageStorageUrl,
        ...(requestMetadata && {
          request_type: 'part_request',
          product_name: requestMetadata.productName || 'Unknown product',
          request_metadata: requestMetadata
        })
      };

      // Save to Supabase first
      console.log('Saving to Supabase...');
      const supabaseSuccess = await saveToSupabase(submissionData);
      
      if (!supabaseSuccess) {
        console.warn('Supabase save failed, but continuing with Formspree submission');
      }

      // Prepare FormData for Formspree
      const formspreeData = new FormData();
      formspreeData.append('name', formData.name);
      formspreeData.append('email', formData.email);
      formspreeData.append('phone', formData.phone);
      formspreeData.append('company', formData.company);
      formspreeData.append('subject', formData.subject);
      formspreeData.append('message', formData.message);
      
      // Add metadata if present
      if (requestMetadata) {
        formspreeData.append('request_type', 'part_request');
        formspreeData.append('product_name', requestMetadata.productName || 'Unknown product');
        formspreeData.append('request_metadata', JSON.stringify(requestMetadata));
      }
      
      // Add image attachment if available and no storage URL
      if (requestImage && !imageStorageUrl) {
        try {
          console.log('Adding image attachment to Formspree...');
          const blob = await convertDataUrlToBlob(requestImage);
          
          if (blob) {
            const fileName = `part-request-${Date.now()}.png`;
            const file = new File([blob], fileName, { type: blob.type || 'image/png' });
            formspreeData.append('attachment', file);
            console.log('Image attachment added:', fileName, 'Size:', file.size);
          }
        } catch (imageError) {
          console.error('Error processing image attachment:', imageError);
        }
      }

      // Add storage URL to Formspree if available
      if (imageStorageUrl) {
        formspreeData.append('image_url', imageStorageUrl);
      }

      // Submit to Formspree
      console.log('Submitting to Formspree...');
      const formspreeSuccess = await submitToFormspree(formspreeData);
      
      if (formspreeSuccess) {
        // Update Supabase record to mark Formspree as successful if Supabase save worked
        if (supabaseSuccess) {
          try {
            await supabase
              .from('contact_submissions')
              .update({ formspree_submitted: true })
              .eq('email', formData.email)
              .eq('submission_date', submissionData.submission_date);
            console.log('Updated Supabase record with Formspree success');
          } catch (updateError) {
            console.error('Error updating Supabase record:', updateError);
          }
        }

        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting Wings Engineering Services. We will get back to you soon.",
        });
        
        // Clear form data
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Clear part request data
        if (onClearRequest) {
          onClearRequest();
        }
      } else {
        throw new Error('Failed to submit form to Formspree');
      }
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange"
        >
          <option value="">Select a subject</option>
          <option value="Sales Inquiry">Sales Inquiry</option>
          <option value="Service Request">Service Request</option>
          <option value="Parts Request">Spare Parts Request</option>
          <option value="Technical Support">Technical Support</option>
          <option value="General Information">General Information</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange resize-none"
        />
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full sm:w-auto btn-primary py-3 px-6 text-sm sm:text-base font-medium"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
