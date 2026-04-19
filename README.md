# Shoply

A modern e-commerce mobile app built with **React Native (Expo)** and **Firebase**.

Shoply allows users to browse products, search, add to cart, and lets sellers manage their own products.

---

## Features

### User

- Browse all products
- Search products
- View product details
- Add to cart
- Set delivery location

### Seller (Admin)

- Add products
- View own products
- Delete products
- Manage listings

---

## Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Firebase**
  - Authentication
  - Firestore Database

- **Zustand** (State Management)

---

## Screens

- Home
- Search
- Product Details
- Cart
- Profile
- Seller Dashboard

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/shoply.git
cd shoply
```

2. Install dependencies

```bash
npm install
```

3. Start the app

```bash
npx expo start
```

---

## Environment Setup

Create a `.env` file and add your Firebase config:

```env
EXPO_PUBLIC_API_KEY=your_key
EXPO_PUBLIC_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_PROJECT_ID=your_project_id
```

---

## Project Structure

```plaintext
app/
  ├── (tabs)/
  ├── admin/
  ├── product/
services/
store/
components/
```

---

## Future Improvements

- Edit product feature
- Order system
- Payment integration
- Notifications
- Image upload (Firebase Storage)

---

## Contributing

Feel free to fork this project and improve it.

---

## License

This project is for learning purposes.
