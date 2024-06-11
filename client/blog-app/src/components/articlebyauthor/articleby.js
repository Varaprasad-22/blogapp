import "./articleby.css";
import axios from "axios";
import {axiosWithToken} from '../../axiosWithToken'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, redirect, Outlet } from "react-router-dom";

function ArticleByAuthor() {
    const [articleList, setArticleList] = useState([]);
    let navigate = useNavigate();
    let { currentUser } = useSelector(
      (state) => state.userAuthoruserAuthorLoginReducer
    );
  
    const getArticlesOfCurrentAuthor=async()=>{
        let res=await axiosWithToken.get(`http://localhost:4000/author-api/view/${currentUser.userName}`)
        console.log(res)
        setArticleList(res.data.payload)
      }
    // Placeholder function to read an article by its ID
    const readArticleById=(articleObj)=>{
        // This function should navigate to the article page using react-router-dom
        // Example: navigate(`/articles/${article.articleId}`);
        navigate(`../article/${articleObj.id}`,{state:articleObj})
  }

    // Placeholder function to fetch the article list
    useEffect(() => {
        // Fetch article list here and set it using setArticleList
        // Example: fetchArticlesByAuthor(authorId).then(setArticleList);
        getArticlesOfCurrentAuthor()
    },[]); // Empty dependency array to run this effect only once

    return (
        <div className="row m-auto">
            <div className="main mx-5">
                {articleList.map((article) => (
                    <div className="col-lg-4 col-md-6" key={article.id}>
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-text">
                                    {article.content.substring(0, 80) + "..."}
                                </p><div className="text-center">
                                <button className="custom-btn btn-4 " onClick={() => readArticleById(article)}>
                                    <span className="text-center">Read More</span>
                                </button></div>
                                <div>
                                    <div className="card-footer">
                                        <small className="text-body-secondary">
                                            Last Update on {article.dateOfModification}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticleByAuthor;
