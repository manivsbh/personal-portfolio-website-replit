export const personalInfo = {
  name: "Manish Cheepa",
  title: "Software Developer IV",
  company: "Astreya",
  location: "Dublin, County Dublin, Ireland",
  email: "manishchhipa98@gmail.com",
  phone: "+91 8107588977",
  linkedin: "https://www.linkedin.com/in/manishcheepa/",
  summary: "As a Software Developer IV at Astreya, I design, develop, and implement ETL/ELT processes using Azure Databricks, Python, and Kafka. I also work with Angular and Django to create web applications and REST APIs. I lead a team of four developers to deliver automated data pipelines from various sources, ensuring reliability, efficiency, and data quality."
};

export const skills = {
  programming: [
    { name: "Python", level: 95 },
    { name: "SQL", level: 90 },
    { name: "Scala", level: 80 },
    { name: "JavaScript", level: 85 }
  ],
  frameworks: [
    { name: "Django/Flask", level: 92 },
    { name: "Apache Spark", level: 88 },
    { name: "Apache Kafka", level: 85 },
    { name: "Angular", level: 82 }
  ],
  technologies: [
    { name: "AWS", icon: "fab fa-aws" },
    { name: "Azure", icon: "fab fa-microsoft" },
    { name: "Docker", icon: "fab fa-docker" },
    { name: "Python", icon: "fab fa-python" },
    { name: "DataBricks", icon: "fas fa-database" },
    { name: "Git", icon: "fab fa-git-alt" }
  ]
};

export const experience = [
  {
    title: "Software Developer IV",
    company: "Astreya",
    location: "Dublin, County Dublin, Ireland",
    period: "May 2023 - Present",
    duration: "Current",
    type: "current",
    achievements: [
      "Migrated Tableau Dashboards with Power BI and Deneb, saving 78% yearly license costs",
      "Won a $10 million project using Vega Dashboard implementation",
      "Led Flask-Angular web application development on AWS cloud infrastructure",
      "Implemented PyTorch-based facial recognition for automated attendance tracking",
      "Designed RESTful APIs for HRMS system with high performance and reliability"
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "InfoObjects Inc.",
    location: "Jaipur, Rajasthan, India",
    period: "Oct 2021 - May 2023",
    duration: "1y 9m",
    type: "previous",
    achievements: [
      "Led team of 7-8 developers in ETL pipeline design using Airflow, Databricks, and Spark",
      "Developed Data Engineering Backend Platform saving 100+ hours of development time",
      "Reduced pipeline costs by 85% and running time by 20 hours through optimization",
      "Created real-time reporting with 2-3ms latency using complex ETL processes",
      "Built custom file ingestion solution for 580-column TSV files with 5-minute processing"
    ]
  },
  {
    title: "Technology Analyst",
    company: "Infosys",
    location: "Pune, Maharashtra, India",
    period: "May 2018 - Oct 2021",
    duration: "3y 5m",
    type: "previous",
    achievements: [
      "Developed serverless solutions using AWS Lambdas, S3, Redshift achieving 1ms latency",
      "Built real-time data applications with AWS Kinesis ensuring 5ms latency and 0% data loss",
      "Created automated monitoring scripts reducing manual weekend work by 100%",
      "Developed RPA bots removing L1 support requirements and achieving 100% SLA",
      "Migrated on-premise applications to cloud, saving 80% costs"
    ]
  }
];

export const projects = [
  {
    title: "$10M Vega Dashboard Project",
    description: "Developed a comprehensive Vega dashboard solution that won a $10 million project for the company. Implemented advanced data visualization techniques and real-time analytics capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Vega", "D3.js", "Python", "AWS"],
    badge: "High Impact"
  },
  {
    title: "Flask-Angular HRMS Platform",
    description: "Led development of a comprehensive HRMS system that automated visa processing and payroll management, saving 60% license costs and 80% manual effort with Workday integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Flask", "Angular", "AWS", "PyTorch"],
    badge: "Cost Saving"
  },
  {
    title: "Real-Time Data Pipeline",
    description: "Designed streaming pipelines using Kafka, Spark, and Databricks, reducing costs by 85% and achieving 2-3ms latency for near real-time reporting capabilities.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Kafka", "Spark", "Databricks", "Airflow"],
    badge: "Performance"
  },
  {
    title: "Automated Monitoring System",
    description: "Created automated server monitoring scripts that eliminated manual weekend work, generating comprehensive reports in under 10 minutes with 100% accuracy.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Unix", "AWS", "Lambda"],
    badge: "Automation"
  }
];

export const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    subtitle: "Associate Level",
    description: "Cloud architecture design and implementation expertise",
    icon: "fab fa-aws",
    date: "Dec 2020",
    color: "warning"
  },
  {
    title: "Microsoft Certified",
    subtitle: "Azure Fundamentals",
    description: "Azure cloud services and solutions fundamentals",
    icon: "fab fa-microsoft",
    date: "Jul 2021",
    color: "primary"
  },
  {
    title: "Google Associate",
    subtitle: "Cloud Engineer",
    description: "Google Cloud Platform deployment and management",
    icon: "fab fa-google",
    date: "Infosys Certified",
    color: "accent"
  },
  {
    title: "RPA Professional",
    subtitle: "UiPath Developer Advanced",
    description: "Robotic Process Automation development and deployment",
    icon: "fas fa-robot",
    date: "Infosys Certified",
    color: "secondary"
  },
  {
    title: "AI For Everyone",
    subtitle: "Artificial Intelligence",
    description: "Fundamental AI concepts and practical applications",
    icon: "fas fa-brain",
    date: "Completed",
    color: "warning"
  },
  {
    title: "English Proficiency",
    subtitle: "Certificate",
    description: "Professional English communication certification",
    icon: "fas fa-language",
    date: "Certified",
    color: "accent"
  }
];

export const education = [
  {
    degree: "Master of Science - Computer Science",
    institution: "Woolf",
    year: "2024"
  },
  {
    degree: "Bachelor of Technology - Electrical Engineering",
    institution: "SKIT Jaipur",
    year: "2014-2018"
  }
];

export const achievements = [
  "Won $10M project using Vega Dashboard",
  "Saved 78% yearly Tableau license costs",
  "Reduced manual effort by 80% with automation",
  "Led teams of 7-8 developers successfully"
];
