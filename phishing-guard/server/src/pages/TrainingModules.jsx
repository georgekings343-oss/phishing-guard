import React from 'react';
import Header from '../components/ui/Header';
import BreadcrumbTrail from '../components/ui/BreadcrumbTrail';

const TrainingModules = () => {
  const trainingModules = [
    {
      title: "Phishing Awareness Fundamentals",
      description: "Learn the basics of identifying phishing attempts and protecting yourself online.",
      duration: "30 minutes",
      status: "Completed"
    },
    {
      title: "Advanced Email Security",
      description: "Deep dive into sophisticated email threats and advanced protection techniques.",
      duration: "45 minutes",
      status: "In Progress"
    },
    {
      title: "Social Engineering Defense",
      description: "Understand and defend against social engineering attacks.",
      duration: "40 minutes",
      status: "Not Started"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="employee" alertCount={0} onMenuToggle={() => {}} />
      <main className="pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <BreadcrumbTrail />
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-text-primary mb-6">Training Modules</h1>
            <div className="space-y-4">
              {trainingModules.map((module, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h2 className="text-lg font-semibold text-text-primary mb-2">{module.title}</h2>
                  <p className="text-muted-foreground mb-2">{module.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Duration: {module.duration}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      module.status === "Completed" ? "bg-success/20 text-success" :
                      module.status === "In Progress" ? "bg-warning/20 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {module.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainingModules;