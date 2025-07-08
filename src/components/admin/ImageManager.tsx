
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, RefreshCw, Globe, HardDrive } from 'lucide-react';
import { imageConfig, syncLocalImagesToSupabase, toggleImageSource } from '@/utils/imageManager';
import { useToast } from '@/hooks/use-toast';

const ImageManager = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{ success: number; failed: string[] } | null>(null);
  const { toast } = useToast();

  const handleSyncImages = async () => {
    setIsUploading(true);
    setUploadResults(null);
    
    try {
      const results = await syncLocalImagesToSupabase();
      setUploadResults(results);
      
      toast({
        title: "Sync Complete",
        description: `Successfully uploaded ${results.success} images. ${results.failed.length} failed.`,
        variant: results.failed.length > 0 ? "destructive" : "default"
      });
    } catch (error) {
      console.error('Error syncing images:', error);
      toast({
        title: "Sync Failed",
        description: "An error occurred while syncing images to Supabase.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleSource = () => {
    toggleImageSource();
    toast({
      title: "Image Source Changed",
      description: `Switched to ${!imageConfig.useLocalImages ? 'Local' : 'Supabase'} images. Page will reload.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Product Image Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Source Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            {imageConfig.useLocalImages ? (
              <HardDrive className="w-5 h-5 text-blue-500" />
            ) : (
              <Globe className="w-5 h-5 text-green-500" />
            )}
            <span className="font-medium">
              Current Source: {imageConfig.useLocalImages ? 'Local Files' : 'Supabase Storage'}
            </span>
          </div>
          <Badge variant={imageConfig.useLocalImages ? "secondary" : "default"}>
            {imageConfig.useLocalImages ? 'Development' : 'Production'}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSyncImages}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            {isUploading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Syncing...' : 'Sync Local Images to Supabase'}
          </Button>

          <Button
            onClick={handleToggleSource}
            variant="outline"
            className="flex items-center gap-2"
          >
            {imageConfig.useLocalImages ? (
              <Globe className="w-4 h-4" />
            ) : (
              <HardDrive className="w-4 h-4" />
            )}
            Switch to {imageConfig.useLocalImages ? 'Supabase' : 'Local'}
          </Button>
        </div>

        {/* Upload Results */}
        {uploadResults && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="default" className="bg-green-500">
                ✅ Success: {uploadResults.success}
              </Badge>
              {uploadResults.failed.length > 0 && (
                <Badge variant="destructive">
                  ❌ Failed: {uploadResults.failed.length}
                </Badge>
              )}
            </div>

            {uploadResults.failed.length > 0 && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Failed Uploads:</h4>
                <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                  {uploadResults.failed.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">How to use:</h4>
          <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>Keep "Local Files" mode during development and testing</li>
            <li>Click "Sync Local Images to Supabase" to upload all images to storage</li>
            <li>Switch to "Supabase" mode when ready for production</li>
            <li>Images will then be served from Supabase and accessible on the internet</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageManager;
