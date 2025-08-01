"use client";
import React from "react";

export default function About() {
    return (
        <div className="about-container">
            <section className="about-content">
                <h1>About Recipe Generator</h1>
                <p>
                    Recipe Generator is your smart assistant for discovering delicious recipes tailored to your preferences. Whether you have specific ingredients or dietary needs, our tool helps you create meals easily and efficiently.
                </p>
                <ul>
                    <li>Generate recipes based on available ingredients</li>
                    <li>Customize for dietary restrictions</li>
                    <li>Save and share your favorite recipes</li>
                </ul>
            </section>
            <style jsx>{`
                .about-container {
                    min-height: 80vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
                    padding: 2rem;
                }
                .about-content {
                    max-width: 600px;
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                    padding: 2rem;
                }
                h1 {
                    font-size: 2.2rem;
                    color: #4f46e5;
                    margin-bottom: 1rem;
                }
                p {
                    font-size: 1.1rem;
                    color: #374151;
                    margin-bottom: 1.5rem;
                }
                ul {
                    list-style: disc inside;
                    color: #6366f1;
                    font-size: 1rem;
                }
                @media (max-width: 600px) {
                    .about-content {
                        padding: 1rem;
                        max-width: 100%;
                    }
                    h1 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}