const config = {
  port: 3000,
  staticFilesConnectionString: 'http://skipper.us-east-1.elasticbeanstalk.com',
  apiConnectionString: 'http://skipper.us-east-1.elasticbeanstalk.com/highlights',
  accessControlHeader: 'http://skipper.us-east-1.elasticbeanstalk.com',
  cartServiceConnectionString: 'http://skipper.us-east-1.elasticbeanstalk.com/cart',
  userServiceConnectionString: 'http://skipper.us-east-1.elasticbeanstalk.com/user',
  aws: {
    credentialsFilePath: null,
    s3Bucket: 'micro-frontends-css'
  }
}

module.exports = config
