import Ajv from 'ajv';

const envVarsSchema = {
  type: 'object',
  properties: {
    NODE_ENV: {
      type: 'string',
      enum: ['production', 'development', 'test', 'local'],
    },
    ALLOWED_DOMAIN: {
      type: ['string', 'null'],
    },
    PORT: {
      type: ['string', 'null'],
    },
  },
  additionalProperties: true,
};

const validate = new Ajv().compile(envVarsSchema);

if (!validate(process.env)) {
  throw new Error(
    `Config validation error: ${JSON.stringify(validate.errors)}`
  );
}
