import React from "react";

const Workshop = () => {
  return (
    <section
      id="workshop"
      className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Limited Time Offer
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            3-Day Live Workshop
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Kickstart your tech career with hands-on exposure to Manual Testing, Full Stack Development,
            and DevOps. Build real projects in just 3 days and discover your perfect tech specialization.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">20</div>
              <div className="text-sm text-muted-foreground">Students Max</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Workshop Details */}
          <div className="space-y-8">
            {/* Price Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">₹999</div>
                <div className="text-muted-foreground">One-time payment</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">3D</span>
                  </div>
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-muted-foreground">3 Days (2 Hours/Day)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">ON</span>
                  </div>
                  <div>
                    <div className="font-medium">Format</div>
                    <div className="text-sm text-muted-foreground">Live Online Sessions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">BG</span>
                  </div>
                  <div>
                    <div className="font-medium">Level</div>
                    <div className="text-sm text-muted-foreground">Beginners Welcome</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">What You'll Get</h3>
              <div className="grid gap-4">
                {[
                  { title: "Live Instructor Sessions", desc: "Interactive online classes with expert guidance" },
                  { title: "Hands-on Projects", desc: "Build real mini-projects from scratch" },
                  { title: "DevOps Deployment", desc: "Learn to deploy applications online" },
                  { title: "Q&A Support", desc: "Get your questions answered in real-time" },
                  { title: "Resource Access", desc: "Downloadable materials and code samples" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-sm text-muted-foreground">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Workshop Schedule */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Workshop Schedule</h3>

              <div className="space-y-6">
                {/* Day 1 */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Day 1: Manual Testing Fundamentals</h4>
                      <p className="text-muted-foreground mb-3">Learn the basics of software testing and quality assurance.</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>What is software testing and why it matters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Real-world testing examples and test case writing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Understanding software flow and bug reporting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Day 2: Full Stack Development Basics</h4>
                      <p className="text-muted-foreground mb-3">Explore how frontend and backend work together.</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Frontend + Backend overview and integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Build a working feature from scratch</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Live API integration demonstration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 3 */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Day 3: DevOps & Deployment</h4>
                      <p className="text-muted-foreground mb-3">Learn to deploy and manage applications in production.</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>DevOps principles and best practices</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>Deploy your mini-project to the cloud</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>How real production applications go live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Important Notes</h4>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• Live participation is required — no recordings available</li>
                <li>• Bring your own laptop with internet connection</li>
                <li>• Basic computer skills recommended</li>
                <li>• Sessions will be conducted via Zoom</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Tech Journey?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join 20 fellow beginners in this intensive 3-day workshop and discover which tech path suits you best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition shadow-lg">
                Register Now - ₹999
              </button>
              <div className="text-sm opacity-75">
                Limited to 20 students • First come, first served
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop;