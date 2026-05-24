import {Routes, Route} from 'react-router'
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {RegisterPage} from "./pages/RegisterPage.jsx";
import {CartPage} from "./pages/CartPage.jsx";
import {CheckoutPage} from "./pages/CheckoutPage.jsx";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage.jsx";
import {ArticlesPage} from "./pages/ArticlesPage.jsx";
import {CoursesPage} from "./pages/CoursesPage.jsx";
import {DictionaryPage} from "./pages/DictionaryPage.jsx";
import './App.css'


function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="dictionary" element={<DictionaryPage />} />
        </Routes>
    )
}

export default App
