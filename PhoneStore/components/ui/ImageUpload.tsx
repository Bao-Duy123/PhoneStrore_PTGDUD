'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
  maxSize?: number; // in MB
  accept?: string[];
  label?: string;
  error?: string;
  className?: string;
}

const DEFAULT_MAX_SIZE = 5; // 5MB
const DEFAULT_ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageUpload({
  value,
  onChange,
  onUpload,
  maxSize = DEFAULT_MAX_SIZE,
  accept = DEFAULT_ACCEPT,
  label = 'Tải lên hình ảnh',
  error,
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!accept.includes(file.type)) {
      return `Định dạng không hỗ trợ. Chỉ chấp nhận: ${accept.map((t) => t.split('/')[1]).join(', ')}`;
    }

    // Check file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `Kích thước file quá lớn. Tối đa ${maxSize}MB`;
    }

    return null;
  };

  const handleFile = useCallback(
    async (file: File) => {
      setLocalError(null);

      // Validate
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload if handler provided
      if (onUpload) {
        setIsUploading(true);
        try {
          const url = await onUpload(file);
          onChange(url);
        } catch {
          setLocalError('Tải lên thất bại. Vui lòng thử lại');
        } finally {
          setIsUploading(false);
        }
      } else {
        // Just return the file as data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          onChange(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange, onUpload, accept, maxSize]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    setLocalError(null);
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange]);

  const displayError = error || localError;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
          isDragging
            ? 'border-[#ff4d4f] bg-[#ff4d4f]/5'
            : displayError
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-[#ff4d4f] hover:bg-gray-50'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !preview && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept.join(',')}
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {preview ? (
          <div className="relative p-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            {isUploading ? (
              <>
                <div className="w-12 h-12 border-4 border-[#ff4d4f] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Đang tải lên...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {isDragging ? (
                    <Upload className="w-8 h-8 text-[#ff4d4f]" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 font-medium mb-1">
                  {isDragging ? 'Thả file vào đây' : 'Kéo và thả hình ảnh vào đây'}
                </p>
                <p className="text-gray-400 text-sm mb-4">hoặc</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Chọn file
                </Button>
                <p className="text-gray-400 text-xs mt-4">
                  Định dạng: {accept.map((t) => t.split('/')[1].toUpperCase()).join(', ')} | Tối đa {maxSize}MB
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {displayError && (
        <p className="text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}

// Avatar-specific upload component
interface AvatarUploadProps {
  value?: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarUpload({ value, onChange, size = 'md', className }: AvatarUploadProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={cn('relative group', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center',
          sizeClasses[size]
        )}
      >
        {value ? (
          <img src={value} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-1/3 h-1/3 text-gray-400" />
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/jpeg,image/png,image/webp';
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                onChange(e.target?.result as string);
              };
              reader.readAsDataURL(file);
            }
          };
          input.click();
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
      >
        <Upload className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
