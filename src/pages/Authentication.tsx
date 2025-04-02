import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Key, Mail, User, Vault } from 'lucide-react';
import Brand from '@/components/Brand';
import { ModeToggle } from '@/components/mode-toggle';
import { login, signInWithGithub, signInWithGoogle, signUp } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/authContext';
import { toast, Toaster } from 'sonner';

export default function Authentication() {
    const navigate = useNavigate();
    // const { refreshUser } = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupEmailError, setSignupEmailError] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPasswordError, setSignupPasswordError] = useState('');

    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [bio, setBio] = useState('');

    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validateEmail = (email: string) => {
        if (!email) {
            return 'Email is required';
        }
        if (!EMAIL_REGEX.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    };


    const handleSignIn = async () => {
        const passwordError = validatePassword(password);
        setPasswordError(passwordError);

        if (!passwordError) {
            try {
                await login(email, password);
                // await refreshUser();
                navigate('/');
            } catch (error: any) {
                setPasswordError(error.message);

            }
        }
    };

    const handleSignUp = async () => {
        const passwordError = validatePassword(signupPassword);
        setSignupPasswordError(passwordError);

        if (!passwordError) {
            try {
                await signUp(signupEmail, signupPassword, name, bio );
                // await refreshUser();
                navigate('/');
            } catch (error: any) {
                console.log(error);
                setSignupPasswordError(error.message);
            }
        }
    };

    const handleGithub = async () => {
        try {
            await signInWithGithub();
            // await refreshUser();
            navigate('/');
        } catch (error: any) {
            console.log(error);
            ;
        }
    }
    const handleGoogle = async () => {
        try {
            const result = await signInWithGoogle();
            // await refreshUser();
            if (result) {

                navigate('/');
                console.log(result);
            }
        } catch (error: any) {
            console.log(error);
            ;
        }
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
            <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Auth form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Brand />
                    </div>

                    <Card className="border-none shadow-none bg-transparent">
                        <CardHeader className="space-y-1 px-0">
                            <CardTitle className="text-3xl">Welcome Back</CardTitle>
                            {/* <CardDescription>
                                Welcome back. Please enter your details
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent className="px-0">
                            <Tabs defaultValue="signin" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-8">
                                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                                </TabsList>

                                <TabsContent value="signin">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className='relative'>
                                                <Mail className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    className={`h-13 rounded-lg pl-12 ${emailError ? 'border-red-500' : ''}`}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setEmailError('');
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className='relative'>
                                                <Key className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    className={`h-13 rounded-lg pl-12 ${passwordError ? 'border-red-500' : ''}`}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setPasswordError('');
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </Button>
                                                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                                                {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={handleSignIn}
                                            disabled={!password || !email}
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="signup">
                                    <div className="space-y-4">


                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <div className='relative'>
                                                <Mail className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    value={name}
                                                    minLength={3}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    className={`h-13 rounded-lg pl-12`}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="space-y-2">
                                            <Label htmlFor="name">Username</Label>
                                            <div className='relative'>
                                                <User className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Create a username"
                                                    value={username}
                                                    minLength={5}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    className={`h-13 rounded-lg pl-12`}
                                                />
                                            </div>
                                        </div> */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Bio</Label>
                                            <div className='relative'>
                                                <User className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Write a bio"
                                                    value={bio}
                                                    minLength={5}
                                                    onChange={(e) => {
                                                        setBio(e.target.value);
                                                    }}
                                                    className={`h-13 rounded-lg pl-12`}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email">Email Address</Label>
                                            <div className='relative'>
                                                <Mail className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={signupEmail}
                                                    onChange={(e) => {
                                                        setSignupEmail(e.target.value);
                                                        setSignupEmailError('');
                                                    }}
                                                    className={`h-13 rounded-lg pl-12 ${signupEmailError ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-password">Password</Label>
                                            <div className='relative'>
                                                <Key className='absolute top-3.5 left-3' strokeWidth={1.5} />
                                                <Input
                                                    id="signup-password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Create a password (min 6 characters)"
                                                    value={signupPassword}
                                                    onChange={(e) => {
                                                        setSignupPassword(e.target.value);
                                                        setSignupPasswordError('');
                                                    }}
                                                    className={`h-13 rounded-lg pl-12 ${signupPasswordError ? 'border-red-500' : ''}`}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                                                >
                                                    {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </Button>
                                                {signupEmailError && <p className="text-sm text-red-500 mt-1">{signupEmailError}</p>}
                                                {signupPasswordError && <p className="text-sm text-red-500 mt-1">{signupPasswordError}</p>}
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={handleSignUp}
                                            disabled={!signupPassword}
                                        >
                                            Create Account
                                        </Button>


                                    </div>
                                </TabsContent>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <Separator />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                Or Continue With
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-center  gap-4">
                                        <Button size={"icon"} variant="outline" className="size-13 rounded-full" onClick={handleGoogle}>
                                            <svg className="size-5" viewBox="0 0 24 24">
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    fill="#EA4335"
                                                />
                                            </svg>
                                        </Button>
                                        <Button variant="outline" className="size-13 rounded-full" onClick={handleGithub}>
                                            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.218.682-.486 0-.236-.009-.866-.013-1.695-2.782.603-3.369-1.338-3.369-1.338-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .27.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                        </Button>

                                    </div>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
                <div className="hidden lg:flex items-center justify-center p-6">
                    <div className="relative w-full max-w-lg aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-6 opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
                            <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Vault className="w-16 h-16 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-10 right-10 ">
                <ModeToggle />
            </div>

        </div>

    )
}
