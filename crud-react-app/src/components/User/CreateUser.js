import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './User.css';
const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "https://67028a6bbd7c8c1ccd3f27a6.mockapi.io/user"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        studentId: "", // 학번 필드 추가
        major: "" // 전공 필드 추가
    })

    const [validationErrors, setValidationErrors] = useState({});

     // 유효성 검사 함수
     const validateForm = () => {
        let errors = {};

        if (!user.name) errors.name = "Name is required.";
        if (!user.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = "Email format is invalid.";
        }
        if (!user.studentId) errors.studentId = "Student ID is required.";
        if (!user.major) errors.major = "Major is required.";

        setValidationErrors(errors);

        // 에러 메시지 모아 alert으로 표시
        if (Object.keys(errors).length > 0) {
            let errorMessages = Object.values(errors).join('\n'); // 모든 오류 메시지를 한 문자열로 연결
            alert(`Please fix the following errors:\n${errorMessages}`);
        }

        // 에러가 하나도 없으면 true 반환, 있으면 false 반환
        return Object.keys(errors).length === 0;
    };

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        // 유효성 검사 실행
        const isValid = validateForm();
        if (!isValid) {
            console.error("Form validation failed. Please check the fields.");
            return; // 유효하지 않으면 POST 요청 중지
        }
        
        console.log(user)
        try {
            setIsLoading(true);
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({name: "",email: "",phone: "",studentId: "", major: ""})
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handelInput} />
                </div>
                 {/* Student ID Field (학번 필드 추가) */}
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            name="studentId"
            value={user.studentId}
            onChange={handelInput}
          />
        </div>

        {/* Major Field (전공 필드 추가) */}
        <div className="mb-3">
          <label htmlFor="major" className="form-label">Major</label>
          <input
            type="text"
            className="form-control"
            id="major"
            name="major"
            value={user.major}
            onChange={handelInput}
          />
        </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser