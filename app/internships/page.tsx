import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InternshipsPage() {
  const programs = [
    {
      id: "software-engineering",
      title: "Software Engineering",
      duration: "6 months",
      level: "Intermediate",
      spots: "15 available",
      description:
        "Comprehensive program covering full-stack development, system design, and software engineering best practices.",
      skills: ["React", "Node.js", "Python", "AWS", "Docker", "Git"],
      requirements: ["Basic programming knowledge", "CS degree or equivalent", "Problem-solving skills"],
      benefits: [
        "Industry mentorship",
        "Real project experience",
        "Job placement assistance",
        "Certificate of completion",
      ],
    },
    {
      id: "data-science",
      title: "Data Science & AI",
      duration: "6 months",
      level: "Advanced",
      spots: "10 available",
      description: "Deep dive into machine learning, data analysis, and AI applications with hands-on projects.",
      skills: ["Python", "TensorFlow", "SQL", "Pandas", "Scikit-learn", "Jupyter"],
      requirements: ["Statistics background", "Python proficiency", "Mathematics foundation"],
      benefits: ["ML project portfolio", "Industry datasets", "Research opportunities", "Networking events"],
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      duration: "4 months",
      level: "Beginner",
      spots: "20 available",
      description: "Learn to build native and cross-platform mobile applications for iOS and Android.",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store"],
      requirements: ["Basic programming", "Mobile interest", "Design thinking"],
      benefits: ["Published apps", "App store optimization", "UI/UX training", "Startup connections"],
    },
  ]

  const successStories = [
    {
      name: "Alex Rodriguez",
      program: "Software Engineering",
      currentRole: "Frontend Developer at Meta",
      image: "/placeholder.svg?height=100&width=100",
      story:
        "The internship program gave me hands-on experience with modern technologies and prepared me for the challenges of working at a top tech company.",
    },
    {
      name: "Priya Patel",
      program: "Data Science & AI",
      currentRole: "ML Engineer at OpenAI",
      image: "/placeholder.svg?height=100&width=100",
      story:
        "Working on real ML projects during my internship helped me understand the practical applications of AI in solving complex problems.",
    },
    {
      name: "Jordan Kim",
      program: "Mobile Development",
      currentRole: "iOS Developer at Spotify",
      image: "/placeholder.svg?height=100&width=100",
      story:
        "From zero mobile development experience to building apps used by millions - this program transformed my career trajectory.",
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
              <Link href="/internships" className="text-blue-600 font-medium">
                Internships
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 transition-colors">
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
              <Link href="/contact">Apply Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
              Career-Launching Programs
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Internship Programs That{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Launch Careers
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join our comprehensive internship programs designed to bridge the gap between academic learning and
              industry requirements. Get hands-on experience with cutting-edge technologies while working on real
              projects under expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Link href="#programs">Explore Programs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#application">Application Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Internship Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our specialized programs designed to match your career goals and skill level
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        program.level === "Beginner"
                          ? "secondary"
                          : program.level === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {program.level}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {program.spots}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{program.title}</CardTitle>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {program.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Small cohorts
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {program.requirements.map((req, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Program Benefits</h4>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Award className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/contact">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="application" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Simple, transparent process to join our internship programs</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Submit Application",
                  description: "Complete our online application form with your background and interests",
                },
                {
                  step: "02",
                  title: "Technical Assessment",
                  description: "Take a skills assessment tailored to your chosen program track",
                },
                {
                  step: "03",
                  title: "Interview Round",
                  description: "Meet with our team to discuss your goals and program fit",
                },
                {
                  step: "04",
                  title: "Program Begins",
                  description: "Start your journey with orientation and meet your mentor",
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

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Meet our alumni who are now thriving in top tech companies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{story.currentRole}</p>
                  <Badge variant="secondary" className="mb-4">
                    {story.program} Graduate
                  </Badge>
                  <p className="text-gray-600 text-sm italic">"{story.story}"</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Launch Your Tech Career?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Applications are now open for our next cohort. Don't miss this opportunity to transform your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Apply Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
