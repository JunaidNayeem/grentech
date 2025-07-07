import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Star,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Rocket,
  Brain,
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ExternalLink,
  Github,
  Target,
  Settings,
  Headphones,
  Play,
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-background"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Grentech
                </span>
                <div className="text-xs text-muted-foreground font-medium">AI • Cloud • Innovation</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#portfolio"
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#programs" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                Programs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Animated Tech Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-spin-slow"></div>

          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-fade-in-up">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 border-0 px-6 py-3 text-sm font-medium"
                  >
                    <Cpu className="w-4 h-4 mr-2" />
                    Next-Gen Technology Solutions
                  </Badge>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Building
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                    Tomorrow's
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient">
                    Technology
                  </span>
                </h1>

                <p className="text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-3xl">
                  We architect cutting-edge solutions, develop next-generation talent, and deliver enterprise-grade
                  technology that powers the future of business innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-xl px-12 py-8 group"
                >
                  <a href="#services">
                    <Rocket className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    Explore Solutions
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 hover:bg-muted/50 text-xl px-12 py-8 group backdrop-blur-sm bg-transparent"
                >
                  <a href="#portfolio">
                    <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </a>
                </Button>
              </div>

              {/* Tech Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "500+", label: "AI Models Deployed", icon: Brain },
                  { number: "2M+", label: "API Calls/Month", icon: Database },
                  { number: "99.9%", label: "Uptime SLA", icon: Shield },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Tech Visualization */}
            <div className="relative animate-fade-in-right">
              <div className="relative z-10">
                {/* Main 3D Card */}
                <Card className="bg-card/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-0 relative">
                    {/* Tech Dashboard Mockup */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          Production
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="text-sm text-gray-400">$ grentech deploy --env production</div>
                        <div className="text-green-400">✓ Building application...</div>
                        <div className="text-green-400">✓ Optimizing assets...</div>
                        <div className="text-green-400">✓ Deploying to cloud...</div>
                        <div className="text-blue-400">🚀 Deployment successful!</div>
                        <div className="text-gray-300">URL: https://app.grentech.com</div>
                      </div>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="p-8 space-y-6">
                      <h3 className="text-xl font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Real-time Analytics
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Active Users", value: "12.4K", change: "+23%" },
                          { label: "Response Time", value: "45ms", change: "-12%" },
                          { label: "Success Rate", value: "99.8%", change: "+0.2%" },
                          { label: "Throughput", value: "2.1K/s", change: "+45%" },
                        ].map((metric, index) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                            <div className="text-sm text-muted-foreground">{metric.label}</div>
                            <div className="text-xs text-green-600">{metric.change}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Tech Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-slow">
                  <Cloud className="w-12 h-12 text-white" />
                </div>

                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <Database className="w-10 h-10 text-white" />
                </div>

                <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl animate-pulse delay-500">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Background Tech Elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Enterprise Solutions
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Technology Solutions
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                That Scale
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From AI-powered applications to cloud infrastructure, we deliver enterprise-grade solutions that transform
              businesses and accelerate digital innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Brain,
                title: "AI & Machine Learning",
                description:
                  "Custom AI solutions, ML model development, and intelligent automation systems that drive business efficiency.",
                features: ["Neural Networks", "Computer Vision", "NLP Processing", "Predictive Analytics"],
                gradient: "from-blue-500 to-cyan-500",
                tech: ["TensorFlow", "PyTorch", "OpenAI", "AWS ML"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                icon: Cloud,
                title: "Cloud Architecture",
                description:
                  "Scalable cloud infrastructure, microservices architecture, and DevOps solutions for modern enterprises.",
                features: ["Auto-scaling", "Load Balancing", "CI/CD Pipelines", "Container Orchestration"],
                gradient: "from-purple-500 to-pink-500",
                tech: ["AWS", "Kubernetes", "Docker", "Terraform"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                icon: Smartphone,
                title: "Full-Stack Development",
                description:
                  "End-to-end application development with modern frameworks, APIs, and real-time capabilities.",
                features: ["React/Next.js", "Node.js APIs", "Real-time Data", "Mobile Apps"],
                gradient: "from-green-500 to-emerald-500",
                tech: ["React", "Node.js", "GraphQL", "React Native"],
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden relative transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Tech Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div
                    className={`absolute top-4 left-4 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm">
              <Target className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Enterprise Projects
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                That Deliver Results
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Discover how we've helped Fortune 500 companies and innovative startups build next-generation technology
              solutions.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-muted/50 p-2 rounded-2xl">
              <TabsTrigger value="all" className="text-sm font-medium rounded-xl">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="ai" className="text-sm font-medium rounded-xl">
                AI/ML
              </TabsTrigger>
              <TabsTrigger value="cloud" className="text-sm font-medium rounded-xl">
                Cloud
              </TabsTrigger>
              <TabsTrigger value="mobile" className="text-sm font-medium rounded-xl">
                Mobile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid lg:grid-cols-2 gap-12">
                {[
                  {
                    title: "AI-Powered Trading Platform",
                    category: "FinTech • AI/ML",
                    description:
                      "Real-time algorithmic trading platform processing $50M+ daily volume with ML-driven predictions.",
                    image: "/placeholder.svg?height=400&width=600",
                    technologies: ["Python", "TensorFlow", "React", "WebSocket", "AWS"],
                    metrics: ["$50M+ Daily Volume", "99.9% Uptime", "2ms Latency"],
                    results: "300% increase in trading efficiency, 40% reduction in risk exposure",
                  },
                  {
                    title: "Smart City IoT Platform",
                    category: "IoT • Cloud Infrastructure",
                    description:
                      "Comprehensive IoT platform managing 10,000+ sensors across smart city infrastructure.",
                    image: "/placeholder.svg?height=400&width=600",
                    technologies: ["Node.js", "MongoDB", "Docker", "Kubernetes", "Azure"],
                    metrics: ["10K+ Sensors", "Real-time Processing", "20% Energy Savings"],
                    results: "20% reduction in energy consumption, improved traffic flow by 35%",
                  },
                  {
                    title: "Healthcare AI Diagnostics",
                    category: "Healthcare • Computer Vision",
                    description: "AI-powered medical imaging platform with 95% accuracy in early disease detection.",
                    image: "/placeholder.svg?height=400&width=600",
                    technologies: ["PyTorch", "OpenCV", "FastAPI", "PostgreSQL", "GCP"],
                    metrics: ["95% Accuracy", "50K+ Scans", "FDA Approved"],
                    results: "Early detection improved by 40%, diagnosis time reduced by 60%",
                  },
                  {
                    title: "E-commerce Personalization Engine",
                    category: "E-commerce • Machine Learning",
                    description:
                      "ML-driven personalization engine increasing conversion rates by 45% for major retailer.",
                    image: "/placeholder.svg?height=400&width=600",
                    technologies: ["Spark", "Kafka", "Redis", "Elasticsearch", "React"],
                    metrics: ["45% Conversion Boost", "1M+ Users", "Real-time Recommendations"],
                    results: "45% increase in conversion rates, 25% boost in average order value",
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-blue-600/90 text-white">{project.category}</Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                          Key Metrics
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {project.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="bg-muted/50 rounded-lg p-3 text-center">
                              <div className="text-sm font-semibold text-blue-600">{metric}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">Business Impact</h5>
                        <p className="text-sm text-green-700 dark:text-green-400">{project.results}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Github className="h-4 w-4 mr-2" />
                          Case Study
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Programs & Training */}
      <section id="programs" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm">
              <Rocket className="w-4 h-4 mr-2" />
              Talent Development
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Elite Tech Programs
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                For Future Leaders
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Intensive programs designed to create the next generation of tech leaders, combining cutting-edge
              curriculum with real-world industry experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                title: "AI Engineering Bootcamp",
                duration: "16 weeks",
                level: "Advanced",
                price: "$4,999",
                description:
                  "Master AI/ML engineering with hands-on projects in computer vision, NLP, and deep learning.",
                image: "/placeholder.svg?height=250&width=350",
                technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "AWS ML"],
                features: [
                  "Build 5 AI applications",
                  "Work with real datasets",
                  "Deploy ML models to production",
                  "1:1 mentorship with AI experts",
                ],
                outcomes: "95% job placement rate, $120K+ average salary",
              },
              {
                title: "Cloud Architecture Mastery",
                duration: "12 weeks",
                level: "Intermediate",
                price: "$3,499",
                description: "Become a cloud architect with expertise in AWS, Kubernetes, and modern DevOps practices.",
                image: "/placeholder.svg?height=250&width=350",
                technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
                features: [
                  "Design scalable architectures",
                  "Hands-on cloud labs",
                  "AWS certification prep",
                  "Real infrastructure projects",
                ],
                outcomes: "AWS certification guaranteed, $110K+ average salary",
              },
              {
                title: "Full-Stack Innovation Track",
                duration: "20 weeks",
                level: "Beginner to Advanced",
                price: "$3,999",
                description: "Complete full-stack development program with modern frameworks and startup methodology.",
                image: "/placeholder.svg?height=250&width=350",
                technologies: ["React", "Node.js", "Next.js", "GraphQL", "MongoDB"],
                features: [
                  "Build 3 full applications",
                  "Startup incubation program",
                  "Industry project experience",
                  "Entrepreneurship training",
                ],
                outcomes: "Launch your own startup or join top tech companies",
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm transform hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    width={350}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-green-600/90 text-white">{program.level}</Badge>
                  <Badge className="absolute top-4 right-4 bg-blue-600/90 text-white text-lg font-bold">
                    {program.price}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Small cohorts
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Program Highlights
                    </h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Career Outcomes</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-400">{program.outcomes}</p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Ready to Build
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The Future?
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Let's discuss your next breakthrough project or career transformation. Our team of experts is ready to
              turn your vision into reality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl">Start Your Project</CardTitle>
                <CardDescription className="text-lg">
                  Tell us about your vision and we'll help you build it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input id="firstName" placeholder="John" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input id="lastName" placeholder="Doe" className="h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="john@company.com" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company
                    </Label>
                    <Input id="company" placeholder="Your Company" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest" className="text-sm font-medium">
                      I'm interested in
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">AI/ML Development</SelectItem>
                        <SelectItem value="cloud">Cloud Architecture</SelectItem>
                        <SelectItem value="fullstack">Full-Stack Development</SelectItem>
                        <SelectItem value="training">Training Programs</SelectItem>
                        <SelectItem value="consulting">Technical Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Project Budget
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                        <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                        <SelectItem value="over-500k">Over $500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements, timeline, and goals..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 text-lg">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-10">
              <div className="grid gap-8">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    description: "Get a response within 2 hours",
                    contact: "hello@grentech.com",
                    action: "mailto:hello@grentech.com",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    description: "Speak with our technical team",
                    contact: "+1 (555) 123-4567",
                    action: "tel:+1-555-123-4567",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    description: "San Francisco Tech Hub",
                    contact: "123 Innovation Drive, SF",
                    action: "#",
                  },
                ].map((contact, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                          <contact.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">{contact.title}</h3>
                          <p className="text-muted-foreground mb-3">{contact.description}</p>
                          <a href={contact.action} className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                            {contact.contact}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Headphones className="w-6 h-6 mr-2 text-blue-600" />
                    24/7 Technical Support
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our technical team is available around the clock for enterprise clients and critical project
                    support.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                    >
                      ✓ 2hr Response Time
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    >
                      ✓ Free Consultation
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/40">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">Grentech</span>
                  <div className="text-sm text-muted-foreground">AI • Cloud • Innovation</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Building tomorrow's technology today. We architect AI solutions, develop cloud infrastructure, and
                create the next generation of tech leaders.
              </p>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "GitHub", "Discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-muted hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  >
                    <span className="text-sm font-medium group-hover:text-white">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Solutions",
                links: [
                  { name: "AI & Machine Learning", href: "#services" },
                  { name: "Cloud Architecture", href: "#services" },
                  { name: "Full-Stack Development", href: "#services" },
                  { name: "Technical Consulting", href: "#contact" },
                ],
              },
              {
                title: "Programs",
                links: [
                  { name: "AI Engineering Bootcamp", href: "#programs" },
                  { name: "Cloud Architecture Mastery", href: "#programs" },
                  { name: "Full-Stack Innovation", href: "#programs" },
                  { name: "Corporate Training", href: "#contact" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Contact", href: "#contact" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-6 text-lg">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              &copy; 2024 Grentech. All rights reserved. Engineered with precision for the future of technology.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
