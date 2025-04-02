import { BoxReveal } from '@/components/magicui/box-reveal';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Pointer } from '@/components/magicui/pointer';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const ErrorPage = ({
  statusCode = 404,
  title = "Page Not Found",
  message = "Sorry, the page you are looking for doesn't exist or has been moved."
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center mx-auto px-4 md:px-8 bg-background relative">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        <div className="mb-8 relative">
          <div className="pointer-events-none">
            <Pointer>
              <div className="flex items-center justify-center size-8 bg-[#7c3df1] rounded-full text-white">
                <AlertTriangle size={16} />
              </div>
            </Pointer>
          </div>
          
          <TextGenerateEffect 
            className="text-6xl md:text-8xl font-bold text-accent-foreground" 
            words={statusCode.toString()} 
          />
        </div>

       
          <h1 className="text-3xl md:text-4xl font-semibold text-accent-foreground mb-4">
            {title}<span className="text-[#7c3df1]">.</span>
          </h1>
     

        <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          
          <Button 
            size="lg" 
            className="bg-[#7c3df1] hover:bg-[#6a33d1] flex items-center gap-2"
            asChild
          >
            <Link to="/">
              <Home size={16} />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
