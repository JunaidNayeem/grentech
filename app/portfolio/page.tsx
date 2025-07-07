import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "EcoTrack - Sustainability Platform",
      category: "Web Application",
      client: "GreenTech Solutions",
      description:
        "A comprehensive platform for tracking and managing corporate sustainability initiatives with real-time analytics and reporting.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "D3.js"],
      features: ["Real-time dashboard", "Carbon footprint tracking", "Automated reporting", "Team collaboration"],
      timeline: "6 months",
      teamSize: "5 developers",
      status: "Completed",
      results: "40% improvement in sustainability tracking efficiency",
    },
    {
      id: 2,
      title: "MediConnect - Healthcare App",
      category: "Mobile Application",
      client: "HealthFirst Clinic",
      description:
        "Mobile application connecting patients with healthcare providers, featuring appointment scheduling and telemedicine capabilities.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React Native", "Firebase", "Node.js", "WebRTC", "Stripe"],
      features: ["Video consultations", "Appointment booking", "Medical records", "Payment integration"],
      timeline: "8 months",
      teamSize: "6 developers",
      status: "Completed",
      results: "10,000+ active users within first 3 months",
    },
    {
      id: 3,
      title: "FinanceAI - Investment Platform",
      category: "SaaS Platform",
      client: "InvestSmart Corp",
      description:
        "AI-powered investment platform providing personalized portfolio recommendations and automated trading capabilities.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "Redis"],
      features: ["AI recommendations", "Portfolio analysis", "Risk assessment", "Automated trading"],
      timeline: "10 months",
      teamSize: "8 developers",
      status: "Completed",
      results: "$2M+ in managed assets within 6 months",
    },
    {
      id: 4,
      title: "EduLearn - Learning Management",
      category: "E-Learning Platform",
      client: "TechEdu Institute",
      description:
        "Comprehensive learning management system with interactive courses, progress tracking, and certification management.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "MongoDB", "Socket.io", "AWS S3", "Stripe"],
      features: ["Interactive courses", "Progress tracking", "Live sessions", "Certificate generation"],
      timeline: "7 months",
      teamSize: "7 developers",
      status: "Completed",
      results: "5,000+ students enrolled, 95% completion rate",
    },
    {
      id: 5,
      title: "RetailPro - E-commerce Solution",
      category: "E-commerce",
      client: "Fashion Forward",
      description:
        "Modern e-commerce platform with advanced inventory management, personalized recommendations, and multi-channel integration.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Shopify Plus", "React", "GraphQL", "Elasticsearch", "Klaviyo"],
      features: ["Inventory management", "Personalization", "Multi-channel sync", "Analytics dashboard"],
      timeline: "5 months",
      teamSize: "4 developers",
      status: "Completed",
      results: "300% increase in online sales",
    },
    {
      id: 6,
      title: "SmartCity Dashboard",
      category: "IoT Platform",
      client: "City of Innovation",
      description:
        "IoT-enabled smart city management platform for monitoring traffic, energy consumption, and public services in real-time.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "Python", "InfluxDB", "Docker", "Kubernetes"],
      features: ["Real-time monitoring", "Predictive analytics", "Alert system", "Resource optimization"],
      timeline: "12 months",
      teamSize: "10 developers",
      status: "In Progress",
      results: "20% reduction in energy consumption",
    },
  ]

  const categories = [
    "All",
    "Web Application",
    "Mobile Application",
    "SaaS Platform",
    "E-Learning Platform",
    "E-commerce",
    "IoT Platform",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Grentech</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/internships" className="text-gray-700 hover:text-blue-600 transition-colors">
                Internships
              </Link>
              <Link href="/portfolio" className="text-blue-600 font-medium">
                Portfolio
              </Link>
              <Link href="/training" className="text-gray-700 hover:text-blue-600 transition-colors">
                Training
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
            <Button asChild>
              <Link href="/contact">Start Project</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
              Industry-Standard Quality
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore our collection of successful client projects spanning web applications, mobile apps, SaaS
              platforms, and innovative solutions delivered by our expert development team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their ideas into successful digital solutions
            </p>
          </div>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid lg:grid-cols-2 gap-8">
                  {projects
                    .filter((project) => category === "All" || project.category === category)
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                      >
                        <div className="relative">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{project.category}</Badge>
                            <span className="text-sm text-gray-500">{project.client}</span>
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-base">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                            <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                              {project.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {project.timeline}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {project.teamSize}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Award className="h-4 w-4 mr-1" />
                              Success
                            </div>
                          </div>

                          <div className="bg-green-50 p-3 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-1">Results Achieved</h5>
                            <p className="text-sm text-green-700">{project.results}</p>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
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
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600">
              A proven methodology that ensures project success and client satisfaction
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your business needs, goals, and technical requirements",
                },
                {
                  step: "02",
                  title: "Planning",
                  description: "Creating detailed project roadmap, architecture, and timeline",
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Agile development with regular updates and client feedback",
                },
                {
                  step: "04",
                  title: "Testing",
                  description: "Comprehensive testing to ensure quality and performance",
                },
                {
                  step: "05",
                  title: "Deployment",
                  description: "Smooth launch with ongoing support and maintenance",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss your project and create a solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
