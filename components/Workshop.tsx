import React from "react";

const Workshop = () => {
  return (
    <section
      id="workshop"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Limited Time Offer
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            3-Day Live Workshop
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-justify px-4">
            Kickstart your tech career with hands-on exposure to Manual Testing, Full Stack Development,
            and DevOps. Build real projects in just 3 days and discover your perfect tech specialization.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="text-center min-w-[80px]">
              <div className="text-2xl sm:text-3xl font-bold text-primary">3</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Days</div>
            </div>
            <div className="text-center min-w-[80px]">
              <div className="text-2xl sm:text-3xl font-bold text-primary">6</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="text-center min-w-[80px]">
              <div className="text-2xl sm:text-3xl font-bold text-primary">20</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Students Max</div>
            </div>
            <div className="text-center min-w-[80px]">
              <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Online</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Left Column - Workshop Details */}
          <div className="space-y-6 sm:space-y-8">
            {/* Price Card */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">₹999</div>
                <div className="text-sm sm:text-base text-muted-foreground">One-time payment</div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs sm:text-sm font-bold">3D</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">Duration</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">3 Days (2 Hours/Day)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs sm:text-sm font-bold">ON</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">Format</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Live Online Sessions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs sm:text-sm font-bold">BG</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">Level</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Beginners Welcome</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What You'll Get</h3>
              <div className="grid gap-3 sm:gap-4">
                {[
                  { title: "Live Instructor Sessions", desc: "Interactive online classes with expert guidance" },
                  { title: "Hands-on Projects", desc: "Build real mini-projects from scratch" },
                  { title: "DevOps Deployment", desc: "Learn to deploy applications online" },
                  { title: "Q&A Support", desc: "Get your questions answered in real-time" },
                  { title: "Resource Access", desc: "Downloadable materials and code samples" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs sm:text-sm font-bold">{i + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm sm:text-base">{feature.title}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Workshop Schedule */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Workshop Schedule</h3>

              <div className="space-y-4 sm:space-y-6">
                {/* Day 1 */}
                <div className="relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold mb-2">Day 1: Manual Testing Fundamentals</h4>
                      <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed text-justify">Learn the basics of software testing and quality assurance.</p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>What is software testing and why it matters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Real-world testing examples and test case writing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Understanding software flow and bug reporting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold mb-2">Day 2: Full Stack Development Basics</h4>
                      <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed text-justify">Explore how frontend and backend work together.</p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Frontend + Backend overview and integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Build a working feature from scratch</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Live API integration demonstration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 3 */}
                <div className="relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold mb-2">Day 3: DevOps & Deployment</h4>
                      <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed text-justify">Learn to deploy and manage applications in production.</p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>DevOps principles and best practices</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>Deploy your mini-project to the cloud</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                          <span>How real production applications go live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 text-sm sm:text-base">Important Notes</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
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
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 text-primary-foreground">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Tech Journey?</h3>
            <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed text-justify max-w-2xl mx-auto px-4">
              Join 20 fellow beginners in this intensive 3-day workshop and discover which tech path suits you best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-50 transition shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Register Now - ₹999
              </button>
              <div className="text-xs sm:text-sm opacity-75">
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