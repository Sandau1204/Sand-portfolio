import { useEffect, useRef, useState, type FormEvent } from "react";

type Language = "vi" | "en";
type Theme = "light" | "dark";

const translations = {
  vi: {
    nav_about: "Về tôi",
    nav_skills: "Kỹ năng",
    nav_projects: "Dự án",
    nav_contact: "Liên hệ",
    hero_role: "Software Engineer & Data Scientist",
    hero_name: "Uông Sỹ Thắng Anh",
    hero_tagline: "Biến ý tưởng thành sản phẩm số chuyên nghiệp.",
    btn_projects: "Xem dự án",
    btn_contact: "Liên hệ ngay",
    about_title: "Về tôi",
    about_desc:
      "Là một Kỹ sư Phần mềm và Nhà Khoa học Dữ liệu, tôi đam mê việc xây dựng các hệ thống có khả năng mở rộng (scalable) và ứng dụng công nghệ Dữ liệu/AI để giải quyết các bài toán thực tế. Với sự kết hợp giữa tư duy phân tích hệ thống và kỹ năng lập trình, tôi luôn hướng tới việc tạo ra những sản phẩm kỹ thuật số tối ưu, mang lại giá trị bền vững cho cả doanh nghiệp và người dùng cuối.",
    stat_exp: "Năm kinh nghiệm",
    stat_project: "Dự án hoàn thành",
    stat_client: "Khách hàng hài lòng",
    skills_title: "Kỹ năng chuyên môn",
    skill_desc_1: "Phân tích dữ liệu, Pandas, NumPy, Scikit-learn.",
    skill_desc_2:
      "Xây dựng mô hình AI dự đoán, xử lý ngôn ngữ tự nhiên (NLP).",
    skill_desc_3: "Thiết kế API RESTful, Node.js, Express, Django.",
    skill_desc_4: "SQL (PostgreSQL, MySQL), NoSQL (MongoDB).",
    skill_desc_5: "Javascript, React.js, xây dựng UI tương tác.",
    skill_desc_6: "Docker, AWS cơ bản, CI/CD pipelines.",
    projects_title: "Dự án nổi bật",
    project_1_title: "",
    project_1_desc: "",
    project_2_title: "",
    project_2_desc: "",
    project_3_title: "",
    project_3_desc: "",
    btn_detail: "Xem chi tiết",
    contact_title: "Liên hệ với tôi",
    contact_subtitle: "Hãy kết nối!",
    contact_desc:
      "Tôi luôn cởi mở với các cơ hội hợp tác mới. Hãy để lại tin nhắn nếu bạn có dự án cần hỗ trợ hoặc đơn giản là muốn trao đổi về công nghệ.",
    contact_email: "Email",
    contact_phone: "Số điện thoại",
    contact_address_title: "Địa chỉ",
    contact_address: "Hồ Chí Minh, Việt Nam",
    form_name: "Họ và tên của bạn",
    form_email: "Email của bạn",
    form_phone: "Số điện thoại",
    form_msg: "Nội dung tin nhắn...",
    btn_submit: "Gửi tin nhắn",
    msg_success: "Gửi thành công! Tôi sẽ liên hệ lại sớm nhất.",
    btn_sending: "Đang gửi...",
  },
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_role: "Software Engineer & Data Scientist",
    hero_name: "Uong Sy Thang Anh",
    hero_tagline: "Turning ideas into professional digital products.",
    btn_projects: "View Projects",
    btn_contact: "Contact Me",
    about_title: "About Me",
    about_desc:
      "As a Software Engineer and Data Scientist, I am passionate about building scalable systems and applying Data/AI technologies to solve real-world problems. Combining system analysis thinking and programming skills, I always aim to create optimal digital products that bring sustainable value to both businesses and end-users.",
    stat_exp: "Years Experience",
    stat_project: "Completed Projects",
    stat_client: "Happy Clients",
    skills_title: "Professional Skills",
    skill_desc_1: "Data analysis, Pandas, NumPy, Scikit-learn.",
    skill_desc_2: "Building predictive AI models, NLP.",
    skill_desc_3: "Designing RESTful APIs, Node.js, Express, Django.",
    skill_desc_4: "SQL (PostgreSQL, MySQL), NoSQL (MongoDB).",
    skill_desc_5: "Javascript, React.js, building interactive UI.",
    skill_desc_6: "Docker, Basic AWS, CI/CD pipelines.",
    projects_title: "Featured Projects",
    project_1_title: "",
    project_1_desc: "",
    project_2_title: "",
    project_2_desc: "",
    project_3_title: "",
    project_3_desc: "",
    btn_detail: "View Details",
    contact_title: "Contact Me",
    contact_subtitle: "Let's Connect!",
    contact_desc:
      "I am always open to new collaboration opportunities. Leave a message if you have a project needing support or simply want to chat about tech.",
    contact_email: "Email",
    contact_phone: "Phone Number",
    contact_address_title: "Address",
    contact_address: "Ho Chi Minh City, Vietnam",
    form_name: "Your Name",
    form_email: "Your Email",
    form_phone: "Phone Number",
    form_msg: "Your message...",
    btn_submit: "Send Message",
    msg_success: "Sent successfully! I'll get back to you soon.",
    btn_sending: "Sending...",
  },
} as const;

type TranslationKey = keyof (typeof translations)["vi"];

const skills: { icon: string; title: string; description: TranslationKey }[] = [
  {
    icon: "fab fa-python",
    title: "Python / Data Science",
    description: "skill_desc_1",
  },
  {
    icon: "fas fa-brain",
    title: "Machine Learning",
    description: "skill_desc_2",
  },
  {
    icon: "fab fa-node-js",
    title: "Backend Development",
    description: "skill_desc_3",
  },
  {
    icon: "fas fa-database",
    title: "Database Management",
    description: "skill_desc_4",
  },
  {
    icon: "fab fa-react",
    title: "Frontend Integration",
    description: "skill_desc_5",
  },
  {
    icon: "fab fa-docker",
    title: "Cloud & Deployment",
    description: "skill_desc_6",
  },
];

const projects = [
  {
    image: "https://placehold.co/600x400/1e293b/ffffff?text=demo",
    title: "project_1_title",
    description: "project_1_desc",
  },
  {
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=demo",
    title: "project_2_title",
    description: "project_2_desc",
  },
  {
    image: "https://placehold.co/600x400/0f172a/ffffff?text=demo",
    title: "project_3_title",
    description: "project_3_desc",
  },
] satisfies { image: string; title: TranslationKey; description: TranslationKey }[];

const stats: { target: number; label: TranslationKey }[] = [
  { target: 0, label: "stat_exp" },
  { target: 0, label: "stat_project" },
  { target: 0, label: "stat_client" },
];

function App() {
  const [language, setLanguage] = useState<Language>("vi");
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [counterValues, setCounterValues] = useState(() =>
    stats.map(({ target }) => String(target)),
  );
  const formRef = useRef<HTMLFormElement>(null);

  const t = (key: TranslationKey) => translations[language][key];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 50);

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    let hasCounted = false;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasCounted) return;
        hasCounted = true;

        stats.forEach(({ target }, index) => {
          if (target === 0) {
            if (index > 0) {
              setCounterValues((values) =>
                values.map((value, position) =>
                  position === index ? "0+" : value,
                ),
              );
            }
            return;
          }

          let current = 0;
          const stepTime = Math.max(1, Math.floor(2000 / target));
          const timer = window.setInterval(() => {
            current += 1;
            setCounterValues((values) =>
              values.map((value, position) =>
                position === index
                  ? `${current}${index === 0 ? "" : "+"}`
                  : value,
              ),
            );

            if (current >= target) window.clearInterval(timer);
          }, stepTime);
          timers.push(timer);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(aboutSection);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    if (!sending) return;

    const sendTimer = window.setTimeout(() => {
      formRef.current?.reset();
      setSending(false);
      setSubmitted(true);
    }, 1500);

    return () => window.clearTimeout(sendTimer);
  }, [sending]);

  useEffect(() => {
    if (!submitted) return;

    const messageTimer = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(messageTimer);
  }, [submitted]);

  useEffect(() => {
    const canvas = document.getElementById(
      "plexus-canvas",
    ) as HTMLCanvasElement | null;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    };

    let particles: Particle[] = [];
    let animationFrame = 0;

    const createParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 9000);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() * 2 - 1) * 0.25,
        speedY: (Math.random() * 2 - 1) * 0.25,
      }));
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const color =
        document.documentElement.dataset.theme === "dark"
          ? "rgba(96, 165, 250, "
          : "rgba(59, 130, 246, ";

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `${color}0.5)`;
        context.fill();

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex++) {
          const other = particles[otherIndex];
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y,
          );
          if (distance >= 120) continue;

          context.beginPath();
          context.strokeStyle = `${color}${(1 - distance / 120) * 0.2})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    createParticles();
    animate();
    window.addEventListener("resize", createParticles);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", createParticles);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setSending(true);
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container nav-content">
          <a href="#" className="logo" onClick={() => setMenuOpen(false)}>
            Sand
          </a>
          <ul className={`nav-links${menuOpen ? " active" : ""}`}>
            {(["about", "skills", "projects", "contact"] as const).map(
              (section) => (
                <li key={section}>
                  <a href={`#${section}`} onClick={() => setMenuOpen(false)}>
                    {t(`nav_${section}`)}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="controls">
            <button
              className="icon-btn lang-btn"
              title="Đổi ngôn ngữ"
              aria-label="Switch language"
              onClick={() =>
                setLanguage((current) => (current === "vi" ? "en" : "vi"))
              }
            >
              {language === "vi" ? "EN" : "VI"}
            </button>
            <button
              className="icon-btn"
              title="Chế độ Sáng/Tối"
              aria-label="Toggle color theme"
              onClick={() =>
                setTheme((current) => (current === "light" ? "dark" : "light"))
              }
            >
              <i
                className={`fas fa-${theme === "light" ? "moon" : "sun"}`}
                aria-hidden="true"
              />
            </button>
            <button
              className="mobile-menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i
                className={`fas fa-${menuOpen ? "times" : "bars"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>

      <header id="hero">
        <canvas id="plexus-canvas" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-text">
            <h2>{t("hero_role")}</h2>
            <h1>{t("hero_name")}</h1>
            <p>{t("hero_tagline")}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                {t("btn_projects")}
              </a>
              <a href="#contact" className="btn btn-outline">
                {t("btn_contact")}
              </a>
            </div>
            <div className="hero-socials">
              <a
                href="https://facebook.com/Sanddeptrai"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@sanddeptrai"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube" aria-hidden="true" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in" aria-hidden="true" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" title="GitHub">
                <i className="fab fa-github" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="img-wrapper">
              <img src={`${import.meta.env.BASE_URL}images/avatar.jpg`} alt="Sand" />
            </div>
          </div>
        </div>
      </header>

      <section id="about">
        <div className="container">
          <h2 className="section-title">{t("about_title")}</h2>
          <div className="about-content">
            <p className="about-text">{t("about_desc")}</p>
            <div className="stats-grid">
              {stats.map(({ target, label }, index) => (
                <div className="stat-card" key={label}>
                  <div className="stat-number" data-target={target}>
                    {counterValues[index]}
                  </div>
                  <div className="stat-text">{t(label)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" style={{ backgroundColor: "var(--surface-color)" }}>
        <div className="container">
          <h2 className="section-title">{t("skills_title")}</h2>
          <div className="skills-grid">
            {skills.map(({ icon, title, description }) => (
              <div className="skill-card" key={title}>
                <div className="skill-icon">
                  <i className={icon} aria-hidden="true" />
                </div>
                <div className="skill-info">
                  <h3>{title}</h3>
                  <p>{t(description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2 className="section-title">{t("projects_title")}</h2>
          <div className="projects-grid">
            {projects.map(({ image, title, description }, index) => (
              <div className="project-card" key={title}>
                <div className="project-img">
                  <img src={image} alt={`Project ${index + 1}`} />
                </div>
                <div className="project-content">
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                  <div className="project-tags">
                    <span className="tag">#</span>
                    <span className="tag">#</span>
                    <span className="tag">#</span>
                  </div>
                  <a
                    href="#"
                    className="btn btn-outline"
                    style={{ padding: "8px 16px", fontSize: "0.9rem" }}
                  >
                    {t("btn_detail")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        style={{ backgroundColor: "var(--surface-color)" }}
      >
        <div className="container">
          <h2 className="section-title">{t("contact_title")}</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>{t("contact_subtitle")}</h3>
              <p>{t("contact_desc")}</p>
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope" aria-hidden="true" />
                </div>
                <div>
                  <h4>{t("contact_email")}</h4>
                  <span>uongsythanganh@gmail.com</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone-alt" aria-hidden="true" />
                </div>
                <div>
                  <h4>{t("contact_phone")}</h4>
                  <span>035 982 9858</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt" aria-hidden="true" />
                </div>
                <div>
                  <h4>{t("contact_address_title")}</h4>
                  <span>{t("contact_address")}</span>
                </div>
              </div>
            </div>
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder={t("form_name")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder={t("form_email")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder={t("form_phone")}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  className="form-control"
                  placeholder={t("form_msg")}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={sending}
              >
                {sending ? t("btn_sending") : t("btn_submit")}
              </button>
              <div
                className="submit-msg"
                style={{ display: submitted ? "block" : "none" }}
                role="status"
              >
                {t("msg_success")}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-socials">
            <a
              href="https://facebook.com/Sanddeptrai"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://youtube.com/@sanddeptrai"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" aria-hidden="true" />
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Uông Sỹ Thắng Anh. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
