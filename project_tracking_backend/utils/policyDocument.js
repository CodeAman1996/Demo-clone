
/**
  * Returns an IAM policy document for a given user and resource.
  *
  * @method buildIAMPolicy
  * @param {String} userId - user id
  * @param {String} effect  - Allow / Deny
  * @param {String} resource - resource ARN
  * @returns {Object} policyDocument
  */
const buildIAMPolicy = (userId, effect, resource) => {
    const policy = {
      principalId: userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
          },
        ],
      },
     
    };
  
    return policy;
  };
  
  module.exports = {
    buildIAMPolicy,
  };