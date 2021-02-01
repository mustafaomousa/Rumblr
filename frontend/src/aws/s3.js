import S3 from 'react-aws-s3';

const config = {
    bucketName: 'rumblrbucket',
    dirName: 'Pictures',
    region: 'us-east-2',
    accessKeyId: 'AKIAJSPJVB25ZPAEXC5A',
    secretAccessKey: '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'
}

const UploadPictureS3Client = new S3(config);

export default UploadPictureS3Client;