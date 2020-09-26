const fetch = require('cross-fetch');
const fs = require('fs');
const config = require('./apollo.config');

const OUTPUT_PATH = './src/gql/possible-types/';
const OUTPUT_FILENAME = 'generated-possible-types.json';

fetch(`${config.client.service.url}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const possibleTypes = {};
    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          (subtype) => subtype.name,
        );
      }
    });
    fs.writeFile(
      `${OUTPUT_PATH}${OUTPUT_FILENAME}`,
      JSON.stringify(possibleTypes),
      (err) => {
        if (err) {
          console.error(`Error writing ${OUTPUT_FILENAME}`, err);
        } else {
          console.log('Possible types successfully generated.');
        }
      },
    );
  });
