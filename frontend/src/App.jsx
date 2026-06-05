import { Routes, Route } from 'react-router'
import { HomePage } from "./pages/Home/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { ArticlesPage } from "./pages/ArticlesPage"
import { ArticleDetailPage } from "./pages/ArticleDetailPage"
import { CoursesPage } from "./pages/Courses/CoursesPage.jsx"
import { CourseDetailPage } from "./pages/CourseDetailPage"
import { LessonDetailPage } from "./pages/LessonDetailPage"
import { TopicDetailPage } from "./pages/TopicDetailPage"
import { DictionaryPage } from "./pages/DictionaryPage"
import { QuizDetailPage } from "./pages/QuizDetailPage"
import { DashboardPage } from "./pages/user-profile/DashboardPage"
import { MyCoursesPage } from "./pages/user-profile/MyCoursesPage"
import { CommentsPage } from "./pages/user-profile/CommentsPage"
import { OrdersPage } from "./pages/user-profile/OrdersPage"
import { ProfilePage } from "./pages/user-profile/ProfilePage"
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
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    )
}

export default App
