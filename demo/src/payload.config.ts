import { buildConfig } from 'payload/config';
import path from 'path';
// import formBuilderPlugin from '../../dist';
import formBuilderPlugin from '../../src';
import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { Block } from 'payload/types';

const colorField: Block = {
  slug: 'color',
  labels: {
    singular: 'Color',
    plural: 'Colors',
  },
  fields: [
    {
      name: 'value',
      type: 'text',
    }
  ]
}

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack: (config) => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            react: path.join(__dirname, "../node_modules/react"),
            "react-dom": path.join(__dirname, "../node_modules/react-dom"),
            "payload": path.join(__dirname, "../node_modules/payload"),
          },
        },
      };

      return newConfig;
    },
  },
  collections: [
    Users,
    Pages
  ],
  plugins: [
    formBuilderPlugin({
      // handlePayment: handleFormPayments,
      // beforeEmail: prepareFormEmails,
      redirectRelationships: [
        'pages'
      ],
      formOverrides: {
        // labels: {
        //   singular: 'Contact Form',
        //   plural: 'Contact Forms'
        // },
        fields: [
          {
            name: 'name',
            type: 'text',
          }
        ]
      },
      fields: {
        payment: true,
        colorField,
        // payment: {
        //     paymentProcessor: {
        //       options: [
        //         {
        //           label: 'Stripe',
        //           value: 'stripe'
        //         },
        //       ],
        //       defaultValue: 'stripe',
        //     },
        // },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
});
