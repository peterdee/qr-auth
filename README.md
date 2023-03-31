## qr-auth

This application demonstrates user authentication on a new device via QR code

Authentication flow:
- user creates account on device **A**
- user generates authentication QR code on device **B**
- user scans generated QR code with device **A**
- user-related data is transferred to device **B**

Backend application is required, see https://github.com/peterdee/go-qr-auth

Stack: [Expo](https://expo.dev), [React Native](https://reactnative.dev), [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

### Deployment

```shell script
git clone https://github.com/peterdee/qr-auth
cd ./qr-auth
nvm use 18
npm ci
```

### Launching

Backend URL for the application should be provided in a `backend.ts` file that should be located in the [configuration](./configuration) directory

See [backend.example.ts](./configuration/backend.example.ts) for details

**Android**

```shell script
npm run android
```

**iOS**

```shell script
npm run ios
```

### Linting

```shell script
npm run lint
```

Using [ESLint](https://eslint.org)

### License

[MIT](./LICENSE.md)
