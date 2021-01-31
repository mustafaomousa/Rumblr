import S3 from 'react-aws-s3';

const config = {
    bucketName: 'rumblrbucket',
    dirName: 'Pictures',
    region: 'us-east-2',
    accessKeyId: 'AKIAIGDITG4HH4QHJAOA',
    secretAccessKey: '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'
}

const UploadPictureS3Client = new S3(config);

export default UploadPictureS3Client;