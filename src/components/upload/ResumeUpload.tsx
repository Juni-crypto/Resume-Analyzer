import React from 'react';
import { Upload, File, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumeUploadProps {
  onFileUpload: (file: File) => void;
  selectedFile: File | null;
}

export function ResumeUpload({ onFileUpload, selectedFile }: ResumeUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      onFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF)</label>
      
      {!selectedFile ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Drag and drop your resume here, or{' '}
            <span className="text-blue-600 font-medium">browse</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">PDF files only</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <File className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700 font-medium">{selectedFile.name}</span>
          </div>
          <button
            onClick={() => onFileUpload(null as any)}
            className="p-1 hover:bg-blue-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </motion.div>
      )}
      
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}