import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Users, Award, ArrowRight, BookOpen, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TrainingPage() {
  const courses = [
    {
      id: "web-development",
      title: "Full-Stack Web Development",
      category: "Web Development",
      level: "Beginner to Advanced",
      duration: "16 weeks",
      price: "$2,499",
      rating: 4.9,
      students: 1250,
      description:
        "Master modern web development with React, Node.js, and cloud deployment. Build real-world applications from scratch.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "AWS"],
      modules: [
        "Frontend Fundamentals",
        "React & State Management",
        "Backend Development",
        "Database Design",
        "API Development",
        "Cloud Deployment",
      ],
      features: [
        "Live coding sessions",
        "1-on-1 mentorship",
        "Real project portfolio",
        "Job placement assistance",
        "Lifetime access",
        "Certificate of completion",
      ],
      schedule: "Mon, Wed, Fri - 7:00 PM to 9:00 PM",
      nextBatch: "March 15, 2024",
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "12 weeks",
      price: "$1,999",
      rating: 4.8,
      students: 890,
      description:
        "Build native and cross-platform mobile apps using React Native and Flutter. Deploy to App Store and Google Play.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React Native", "Flutter", "Dart", "Firebase", "Redux", "Native APIs"],
      modules: [
        "Mobile UI/UX Design",
        "React Native Fundamentals",
        "Flutter Development",
        "State Management",
        "Native Features",
        "App Store Deployment",
      ],
      features: [
        "Hands-on projects",
        "Industry mentors",
        "App store publishing",
        "UI/UX design training",
        "Performance optimization",
        "Career guidance",
      ],
      schedule: "Tue, Thu - 6:30 PM to 9:00 PM",
      nextBatch: "March 22, 2024",
    },
    {
      id: "saas-development",
      title: "SaaS Product Development",
      category: "SaaS",
      level: "Advanced",
      duration: "20 weeks",
      price: "$3,499",
      rating: 4.9,
      students: 650,
      description:
        "Learn to build scalable SaaS applications with subscription management, multi-tenancy, and enterprise features.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Docker", "Kubernetes", "Microservices"],
      modules: [
        "SaaS Architecture",
        "Multi-tenant Design",
        "Payment Integration",
        "User Management",
        "Analytics & Monitoring",
        "Scaling Strategies",
      ],
      features: [
        "Build complete SaaS",
        "Revenue model training",
        "Scaling best practices",
        "Security implementation",
        "Business mentorship",
        "Launch support",
      ],
      schedule: "Sat, Sun - 10:00 AM to 2:00 PM",
      nextBatch: "April 5, 2024",
    },
    {
      id: "data-science",
      title: "Data Science & Machine Learning",
      category: "Data Science",
      level: "Intermediate to Advanced",
      duration: "18 weeks",
      price: "$2,799",
      rating: 4.8,
      students: 720,
      description:
        "Master data analysis, machine learning, and AI with Python. Work on real datasets and deploy ML models.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Jupyter", "AWS ML"],
      modules: [
        "Data Analysis Fundamentals",
        "Statistical Methods",
        "Machine Learning Algorithms",
        "Deep Learning",
        "Model Deployment",
        "MLOps Practices",
      ],
      features: [
        "Real dataset projects",
        "Industry case studies",
        "ML model deployment",
        "Portfolio development",
        "Research opportunities",
        "Industry connections",
      ],
      schedule: "Mon, Wed, Fri - 6:00 PM to 8:30 PM",
      nextBatch: "March 29, 2024",
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud Engineering",
      category: "DevOps",
      level: "Intermediate",
      duration: "14 weeks",
      price: "$2,299",
      rating: 4.7,
      students: 580,
      description:
        "Master DevOps practices, CI/CD pipelines, and cloud infrastructure management with AWS, Docker, and Kubernetes.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Monitoring"],
      modules: [
        "Cloud Fundamentals",
        "Containerization",
        "CI/CD Pipelines",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Security Best Practices",
      ],
      features: [
        "Hands-on labs",
        "Cloud certifications prep",
        "Real infrastructure projects",
        "Industry best practices",
        "24/7 lab access",
        "Job placement support",
      ],
      schedule: "Tue, Thu, Sat - 7:00 PM to 9:00 PM",
      nextBatch: "April 12, 2024",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design Mastery",
      category: "Design",
      level: "Beginner to Intermediate",
      duration: "10 weeks",
      price: "$1,799",
      rating: 4.9,
      students: 950,
      description:
        "Learn user-centered design principles, prototyping, and create stunning interfaces using Figma and design systems.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Miro"],
      modules: [
        "Design Thinking",
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Design Systems",
        "Usability Testing",
      ],
      features: [
        "Portfolio development",
        "Industry projects",
        "Design critique sessions",
        "Client presentation skills",
        "Design system creation",
        "Freelance guidance",
      ],
      schedule: "Mon, Wed - 6:00 PM to 8:30 PM",
      nextBatch: "March 18, 2024",
    },
  ]

  const categories = ["All", "Web Development", "Mobile Development", "SaaS", "Data Science", "DevOps", "Design"]

  const instructors = [
    {
      name: "Sarah Chen",
      role: "Senior Full-Stack Developer",
      company: "Google",
      experience: "8+ years",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["React", "Node.js", "System Design"],
    },
    {
      name: "Marcus Johnson",
      role: "Mobile Engineering Lead",
      company: "Uber",
      experience: "10+ years",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["React Native", "iOS", "Android"],
    },
    {
      name: "Dr. Priya Sharma",
      role: "ML Research Scientist",
      company: "Microsoft",
      experience: "12+ years",
      image: "/placeholder.svg?height=100&width=100",
      specialties: ["Machine Learning", "Deep Learning", "AI"],
    },
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
              <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 transition-colors">
                Portfolio
              </Link>
              <Link href="/training" className="text-blue-600 font-medium">
                Training
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
            <Button asChild>
              <Link href="/contact">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
              Industry-Leading Training
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                In-Demand Skills
              </span>{" "}
              with Expert Training
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your career with our comprehensive training programs in Web Development, Mobile Apps, SaaS, Data
              Science, and more. Learn from industry experts and build real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Link href="#courses">Browse Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#instructors">Meet Instructors</Link>
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
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Training Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive courses designed by industry experts to match current market demands
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
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {courses
                    .filter((course) => category === "All" || course.category === category)
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                      >
                        <div className="relative">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/90">
                              {course.level}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="default" className="bg-green-600">
                              {course.price}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{course.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-sm text-gray-500">({course.students})</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-base">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {course.students} students
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.technologies.slice(0, 4).map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {course.technologies.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{course.technologies.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Course Modules</h4>
                            <ul className="space-y-1">
                              {course.modules.slice(0, 3).map((module, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {module}
                                </li>
                              ))}
                              {course.modules.length > 3 && (
                                <li className="text-sm text-gray-500">+{course.modules.length - 3} more modules</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-blue-800">Next Batch:</span>
                              <span className="text-blue-700">{course.nextBatch}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="font-medium text-blue-800">Schedule:</span>
                              <span className="text-blue-700 text-xs">{course.schedule}</span>
                            </div>
                          </div>

                          <Button className="w-full" asChild>
                            <Link href="/contact">
                              Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructors" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Learn from Industry Experts</h2>
            <p className="text-xl text-gray-600">Our instructors are seasoned professionals from top tech companies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-blue-600 text-sm mb-1">{instructor.role}</p>
                  <p className="text-gray-500 text-sm mb-3">
                    {instructor.company} • {instructor.experience}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {instructor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Grentech Training?</h2>
            <p className="text-xl text-gray-600">
              We provide more than just courses - we provide career transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Hands-on Learning",
                description: "Build real projects and gain practical experience that employers value",
              },
              {
                icon: Users,
                title: "1-on-1 Mentorship",
                description: "Get personalized guidance from industry experts throughout your journey",
              },
              {
                icon: Award,
                title: "Job Placement Support",
                description: "95% job placement rate with dedicated career services and interview prep",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "Evening and weekend batches designed for working professionals",
              },
              {
                icon: CheckCircle,
                title: "Industry Certification",
                description: "Earn recognized certificates that validate your skills to employers",
              },
              {
                icon: ArrowRight,
                title: "Lifetime Access",
                description: "Continue learning with lifetime access to course materials and updates",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Start Your Learning Journey Today</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of successful professionals who transformed their careers with Grentech training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Enroll Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
