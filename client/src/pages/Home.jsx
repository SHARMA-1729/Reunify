import { Link } from 'react-router-dom';
import { HeroSection } from '@/components/blocks/hero-section';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Badge, FileSearch, Bell, Shield } from 'lucide-react';
import HeroVideo from '@/assets/Lost_Girl_s_Sunset_Reunion.mp4';

export function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Because Every Child Deserves to Be Found"
        description="Advanced facial recognition technology helping families reunite with their loved ones. Report missing children and found children to help bring families back together."
        actions={[
          {
            text: token ? 'Go to Dashboard' : 'Find My Child',
            href: token ? '/dashboard' : '/login',
            variant: 'default',
          },
          {
            text: 'Learn How It Works',
            href: '#how-it-works',
            variant: 'outline',
          },
        ]}
        image={{
          src: HeroVideo,
          alt: 'Reunify Platform Preview',
        }}
      />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our simple three-step process uses advanced technology to help
              reunite families
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileSearch className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Report</CardTitle>
                <CardDescription>
                  Provide details and upload a photo of the missing child to
                  alert the community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Badge className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Match</CardTitle>
                <CardDescription>
                  Our system compares uploaded photos using advanced facial
                  recognition to identify potential matches quickly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Notify</CardTitle>
                <CardDescription>
                  Receive real-time updates and notifications about potential
                  matches and case progress.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Safety Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="mb-2">Safety First</CardTitle>
                  <CardDescription className="text-base">
                    We prioritize the security and privacy of all personal
                    information shared on our platform. All data is encrypted
                    and handled with the utmost care to protect your family's
                    privacy.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!token && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join our community and help bring families back together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Reunify</h3>
              <p className="text-sm text-muted-foreground">
                Helping families reunite with their loved ones using advanced
                technology.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                For support and inquiries, please contact us through the
                platform.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Reunify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
