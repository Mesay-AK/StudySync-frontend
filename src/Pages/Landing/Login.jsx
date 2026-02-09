import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/user/dashboard");
    };

    return (
        <div>
            <BackButton/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-900 via-stone-600 to-stone-300 p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400 mb-2">Welcome Back</h1>
                    <p className="text-blue-100">Please enter your credentials to access your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="h-4 w-4 text-blue-400 focus:ring-blue-500 border-white/20 rounded bg-white/10"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-white">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-300 hover:text-blue-200 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex border items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg border border-white/20 transition duration-300 hover:text-blue-900 hover:border-blue-300"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-blue-200">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <button
                        type="button"
                        className="w-full flex border items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg border border-white/20 transition duration-300
                        hover:text-blue-900 hover:border-blue-300"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
                        </svg>
                        Sign in with Google
                    </button>
                </form>

            </div>
        </div>
        </div>
    );
}

export default LogIn;