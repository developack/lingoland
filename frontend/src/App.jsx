import { Routes, Route } from 'react-router'
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { ArticlesPage } from "./pages/ArticlesPage"
import { ArticleDetailPage } from "./pages/ArticleDetailPage"
import { CoursesPage } from "./pages/CoursesPage"
import { CourseDetailPage } from "./pages/CourseDetailPage"
import { LessonDetailPage } from "./pages/LessonDetailPage"
import { TopicDetailPage } from "./pages/TopicDetailPage"
import { DictionaryPage } from "./pages/DictionaryPage"
import { DashboardPage } from  "./pages/DashboardPage"
import { MyCoursesPage } from  "./pages/MyCoursesPage"
import { QuizDetailPage } from "./pages/QuizDetailPage"
import './App.css'


function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:slug" element={<ArticleDetailPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:slug" element={<CourseDetailPage />} />
            <Route path="/lesson/:slug" element={<LessonDetailPage />} />
            <Route path="/topic/:slug" element={<TopicDetailPage />} />
            <Route path="/quiz/:slug" element={<QuizDetailPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
        </Routes>
    )
}

export default App
