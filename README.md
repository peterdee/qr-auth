## qr-auth

This application demonstrates user authentication on a new device via QR code

Authentication flow:
- user creates account on device **A**
- user generates a QR code on device **B**
- user scans generated QR code with device **A**
- user-related data is transferred to device **B**

Similar approach is used in Telegram and Steam

### Deployment

```shell script
git clone https://github.com/peterdee/qr-auth
cd ./qr-auth
nvm use 18
npm ci
```

### Launching

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
