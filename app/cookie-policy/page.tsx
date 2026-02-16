import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
            <Navbar />
            <main className="container mx-auto px-4 py-24 md:px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                <div className="prose prose-invert prose-indigo max-w-none space-y-6 text-zinc-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
                        <p>
                            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.
                            This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                            We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
                        <p>
                            We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                            It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Disabling Cookies</h2>
                        <p>
                            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this).
                            Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
                            Disabling cookies will usually result in also disabling certain functionality and features of the this site.
                            Therefore it is recommended that you do not disable cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. The Cookies We Set</h2>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.
                            </li>
                            <li>
                                <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Third Party Cookies</h2>
                        <p>
                            In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
