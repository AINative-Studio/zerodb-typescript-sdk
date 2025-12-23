/**
 * File Operations Examples
 */

import { ZeroDBClient } from '../src';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const client = new ZeroDBClient({
    apiKey: 'ZERODB_your_api_key'
  });

  const projectId = 'your-project-uuid';

  // Example 1: Upload a file from buffer
  console.log('Example 1: Upload a file from buffer');
  const fileContent = 'This is a test file content';
  const buffer = Buffer.from(fileContent, 'utf-8');

  const uploadResult = await client.files.uploadBuffer(
    projectId,
    'test.txt',
    buffer,
    'text/plain',
    {
      author: 'John Doe',
      category: 'test'
    }
  );
  console.log('Uploaded file ID:', uploadResult.file_id);
  console.log('File size:', uploadResult.size_bytes, 'bytes');

  // Example 2: Upload a file from base64
  console.log('\nExample 2: Upload a file from base64');
  const base64Content = Buffer.from('Another test file').toString('base64');

  const uploadResult2 = await client.files.upload({
    project_id: projectId,
    file_name: 'document.txt',
    file_data: base64Content,
    content_type: 'text/plain',
    metadata: {
      type: 'document',
      version: '1.0'
    }
  });
  console.log('Uploaded file ID:', uploadResult2.file_id);

  // Example 3: List files
  console.log('\nExample 3: List files');
  const listResult = await client.files.list({
    project_id: projectId,
    limit: 10
  });
  console.log(`Found ${listResult.total_count} files:`);
  listResult.files.forEach(file => {
    console.log(`- ${file.file_name} (${file.size_bytes} bytes)`);
  });

  // Example 4: Get file metadata
  console.log('\nExample 4: Get file metadata');
  const metadata = await client.files.getMetadata(projectId, uploadResult.file_id);
  console.log('File name:', metadata.file_name);
  console.log('Content type:', metadata.content_type);
  console.log('Metadata:', metadata.file_metadata);

  // Example 5: Download a file
  console.log('\nExample 5: Download a file');
  const downloadResult = await client.files.download({
    project_id: projectId,
    file_id: uploadResult.file_id
  });
  console.log('Downloaded file:', downloadResult.file_name);
  const downloadedContent = Buffer.from(downloadResult.file_data, 'base64').toString('utf-8');
  console.log('Content:', downloadedContent);

  // Example 6: Generate presigned URL for direct access
  console.log('\nExample 6: Generate presigned URL');
  const presignedUrl = await client.files.generatePresignedUrl({
    project_id: projectId,
    file_id: uploadResult.file_id,
    expiration_seconds: 3600,
    operation: 'download'
  });
  console.log('Presigned URL:', presignedUrl.presigned_url);
  console.log('Expires at:', presignedUrl.expires_at);

  // Example 7: Upload with prefix (organization)
  console.log('\nExample 7: List files with prefix filter');
  const filteredFiles = await client.files.list({
    project_id: projectId,
    prefix: 'documents/',
    limit: 10
  });
  console.log(`Found ${filteredFiles.total_count} files in documents/ folder`);

  // Example 8: Delete a file
  console.log('\nExample 8: Delete a file');
  const deleteResult = await client.files.delete({
    project_id: projectId,
    file_id: uploadResult.file_id
  });
  console.log('Deleted:', deleteResult.status);
  console.log('Freed space:', deleteResult.freed_bytes, 'bytes');
}

// Advanced example: Upload multiple files
async function uploadMultipleFiles() {
  const client = new ZeroDBClient({
    apiKey: 'ZERODB_your_api_key'
  });

  const projectId = 'your-project-uuid';
  const filesToUpload = ['file1.txt', 'file2.txt', 'file3.txt'];

  console.log('Uploading multiple files...');

  const uploadPromises = filesToUpload.map(async (filename) => {
    const content = `Content of ${filename}`;
    const buffer = Buffer.from(content);

    return client.files.uploadBuffer(
      projectId,
      filename,
      buffer,
      'text/plain',
      { batch: 'upload-1' }
    );
  });

  const results = await Promise.all(uploadPromises);
  console.log(`Uploaded ${results.length} files successfully`);
  results.forEach(result => {
    console.log(`- File ID: ${result.file_id}`);
  });
}

if (require.main === module) {
  main()
    .then(() => console.log('\nAll examples completed'))
    .catch(error => console.error('Error:', error));
}
