import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import GetInvolved from "@/pages/GetInvolved";
import Contact from "@/pages/Contact";
import DonationSuccess from "@/pages/DonationSuccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/projects" component={Projects}/>
      <Route path="/get-involved" component={GetInvolved}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/donation-success" component={DonationSuccess}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Router />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
