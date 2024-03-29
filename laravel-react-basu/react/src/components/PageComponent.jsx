import React from 'react';

const PageComponent = ({ title, buttons = '', children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-mono tracking-tight text-gray-900">{title}</h1>
          {buttons}
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageComponent;
