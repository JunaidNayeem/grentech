"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, ExternalLink, Github } from "lucide-react"
import {AIPowered,HealthCareAI,SmartCity,ECommercePersonalized,CloudMigration,MobileApp} from '../../public/ImageURI/CardImg'
import Image from "next/image"

export default function PortfolioShowcase() {
  const allProjects = [
    {
      title: "AI-Powered Trading Platform",
      category: "FinTech • AI/ML",
      description: "Real-time algorithmic trading platform processing $50M+ daily volume with ML-driven predictions.",
      image: AIPowered,
      technologies: ["Python", "TensorFlow", "React", "WebSocket", "AWS"],
      metrics: ["$50M+ Daily Volume", "99.9% Uptime", "2ms Latency"],
      results: "300% increase in trading efficiency, 40% reduction in risk exposure",
      type: "ai",
    },
    {
      title: "Smart City IoT Platform",
      category: "IoT • Cloud Infrastructure",
      description: "Comprehensive IoT platform managing 10,000+ sensors across smart city infrastructure.",
      image: SmartCity,
      technologies: ["Node.js", "MongoDB", "Docker", "Kubernetes", "Azure"],
      metrics: ["10K+ Sensors", "Real-time Processing", "20% Energy Savings"],
      results: "20% reduction in energy consumption, improved traffic flow by 35%",
      type: "cloud",
    },
    {
      title: "Healthcare AI Diagnostics",
      category: "Healthcare • Computer Vision",
      description: "AI-powered medical imaging platform with 95% accuracy in early disease detection.",
      image: HealthCareAI,
      technologies: ["PyTorch", "OpenCV", "FastAPI", "PostgreSQL", "GCP"],
      metrics: ["95% Accuracy", "50K+ Scans", "FDA Approved"],
      results: "Early detection improved by 40%, diagnosis time reduced by 60%",
      type: "ai",
    },
    {
      title: "E-commerce Personalization Engine",
      category: "E-commerce • Machine Learning",
      description: "ML-driven personalization engine increasing conversion rates by 45% for major retailer.",
      image: ECommercePersonalized,
      technologies: ["Spark", "Kafka", "Redis", "Elasticsearch", "React"],
      metrics: ["45% Conversion Boost", "1M+ Users", "Real-time Recommendations"],
      results: "45% increase in conversion rates, 25% boost in average order value",
      type: "ai",
    },
    {
      title: "Enterprise Cloud Migration",
      category: "Cloud • DevOps",
      description: "Complete cloud migration for Fortune 500 company with zero downtime deployment.",
      image: CloudMigration,
      technologies: ["AWS", "Terraform", "Jenkins", "Docker", "Kubernetes"],
      metrics: ["Zero Downtime", "50% Cost Reduction", "99.99% SLA"],
      results: "50% reduction in infrastructure costs, improved scalability by 300%",
      type: "cloud",
    },
    {
      title: "Cross-Platform Mobile App",
      category: "Mobile • React Native",
      description: "Feature-rich mobile application serving 1M+ users across iOS and Android platforms.",
      image: MobileApp,
      technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
      metrics: ["1M+ Downloads", "4.8★ Rating", "Native Performance"],
      results: "1M+ downloads in first year, 4.8-star rating across app stores",
      type: "mobile",
    },
     ]

  const ProjectCard = ({ project }: { project: (typeof allProjects)[0] }) => (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm">
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
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Key Metrics</h4>
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
  )

  return (
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
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-2xl bg-muted/50 p-1 text-muted-foreground">
              <TabsTrigger
                value="all"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                AI/ML
              </TabsTrigger>
              <TabsTrigger
                value="cloud"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Cloud
              </TabsTrigger>
              <TabsTrigger
                value="mobile"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Mobile
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid lg:grid-cols-2 gap-12">
              {allProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="grid lg:grid-cols-2 gap-12">
              {allProjects
                .filter((project) => project.type === "ai")
                .map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cloud">
            <div className="grid lg:grid-cols-2 gap-12">
              {allProjects
                .filter((project) => project.type === "cloud")
                .map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="grid lg:grid-cols-2 gap-12">
              {allProjects
                .filter((project) => project.type === "mobile")
                .map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
