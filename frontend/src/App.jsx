import { Routes, Route } from 'react-router'
import { HomePage } from "@/pages/Home/HomePage"
import { LoginPage } from "@/pages/Auth/LoginPage.jsx"
import { RegisterPage } from "@/pages/Auth/RegisterPage.jsx"
import { ForgotPasswordPage } from "@/pages/Auth/ForgotPasswordPage.jsx"
import { CartPage } from "@/pages/Cart/CartPage"
import { CheckoutPage } from "@/pages/Checkout/CheckoutPage.jsx"
import { ArticlesPage } from "@/pages/Articles/ArticlesPage"
import { ArticleDetailPage } from "@/pages/ArticleDetail/ArticleDetailPage"
import { CoursesPage } from "@/pages/Courses/CoursesPage"
import { CourseDetailPage } from "@/pages/CourseDetail/CourseDetailPage"
import { LessonDetailPage } from "@/pages/LessonDetail/LessonDetailPage.jsx"
import { TopicDetailPage } from "@/pages/TopicDetail/TopicDetailPage.jsx"
import { DictionaryPage } from "@/pages/DictionaryPage"
import { QuizDetailPage } from "@/pages/QuizDetail/QuizDetailPage.jsx"
import { DashboardPage } from "@/pages/UserPanel/Dashboard/DashboardPage.jsx"
import { MyCoursesPage } from "@/pages/UserPanel/Courses/MyCoursesPage.jsx"
import { CommentsPage } from "@/pages/UserPanel/Comments/CommentsPage.jsx"
import { OrdersPage } from "@/pages/UserPanel/Orders/OrdersPage.jsx"
import { ProfilePage } from "@/pages/UserPanel/Profile/ProfilePage.jsx"
import { NotFoundPage } from "@/pages/404/NotFoundPage"
import { Toaster } from "sonner";
import './App.css'


function App() {
    return (
        <>
            <Toaster position="bottom-left" />
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
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default App
