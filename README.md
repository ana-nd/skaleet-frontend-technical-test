# Skaleet Frontend Technical Test

This is a React Native application that allows users to manage transactions and beneficiaries.

## Features
- Add and list transactions
- Add and list beneficiaries
- Validate IBAN numbers using an external API
- Local state management using context

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Xcode (for iOS development)
- Android Studio (for Android development)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)

## Installation

### 1. Clone the repository
```bash
git clone git@github.com:ana-nd/skaleet-frontend-technical-test.git
cd skaleet-frontend-technical-test
```

### 2. Install project dependencies

```bash
npm install
```

### 3. Install iOS Pods (for iOS)

Navigate to the ios directory and install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

## Running the Application

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Running Metro Bundler

Metro bundler is automatically started when you run the project. However, if you want to run it manually:

```bash
npm start
npm start --reset-cache // to clear the cache
```

## Example IBANs for Testing

Here are some valid IBANs you can use to test the IBAN validation feature:

    Germany (DE): DE89370400440532013000
    United Kingdom (GB): GB82WEST12345698765432
    France (FR): FR1420041010050500013M02606
    Spain (ES): ES9121000418450200051332
    Netherlands (NL): NL91ABNA0417164300