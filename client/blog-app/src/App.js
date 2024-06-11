import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import { lazy, Suspense } from 'react';
import Home from "./components/home/home";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import AuthorProfile from "./components/authorprofilr/authorprofile";
import ArticleByAuthor from "./components/articlebyauthor/articleby";
import UserProfile from "./components/userprofile/userprofile";
import Articles from "./components/articles/articles";
import Article from "./components/article/article";
import ErrorPage from './components/errorPage';
import AdminProfile from './components/adminprofile/admin';
import Users from './components/users/user';
import Authors from './components/authors/author';

const AddArticle = lazy(() => import('./components/addarticle/addarticle'));

function App() {
  const browserRouter = createBrowserRouter([{
    path: '',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: "article/:articleId",
            element: <Article />
          },
          {
            path: '',
            element: <Navigate to='articles' />
          }
        ]
      },
      {
        path: "/author-profile",
        element: <AuthorProfile />,
        children: [
          {
            path: 'add-article',
            element: <AddArticle />
          },
          {
            path: 'articles-by-author/:author',
            element: <ArticleByAuthor />,
          },
          {
            path: "article/:articleId",
            element: <Article />
          },
          {
            path: '',
            element: <Navigate to='articles-by-author/:author' />
          }
        ]
      },
      {
        path: "/admin-profile",
        element: <AdminProfile />,
        children: [
          {
            path: "users",
            element: <Users />
          },
          {
            path: "authors",
            element: <Authors />
          },
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: "article/:articleId",
            element: <Article />
          },
          {
            path: '',
            element: <Navigate to='users' />
          }
        ]
      }
    ]
  }]);

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
