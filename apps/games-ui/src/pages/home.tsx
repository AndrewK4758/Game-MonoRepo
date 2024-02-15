import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container-for-content">
      <div className="home">
        <h1 className="home-title">Welcome To My Game</h1>
      </div>
      <Outlet />
    </div>
  );
}
