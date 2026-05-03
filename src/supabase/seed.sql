-- ============================================================
-- ITS Elabram Developer Showcase — Seed Data
-- Jalankan SETELAH schema.sql berhasil dijalankan
-- ============================================================

-- ── INSERT 8 SAMPLE PROJECTS ──
insert into public.projects (emoji, name, featured, tagline, description, category, status, team, url, members, tech, tags, created_at) values
(
  '📊', 'BI Dashboard v3', true,
  'Real-time business intelligence dashboard dengan AI-powered insights',
  'Platform BI komprehensif yang menggabungkan data dari 12+ sistem internal. Dilengkapi dengan fitur drill-down, alerting otomatis, dan prediksi tren menggunakan machine learning. Dashboard ini telah digunakan oleh 200+ pengguna dari berbagai divisi dan berhasil mengurangi waktu pelaporan manual sebesar 75%.',
  'Data & Analytics', 'live', 'Data Engineering', null,
  array['Ahmad F.', 'Dewi R.', 'Reza A.', 'Siti N.'],
  array['React', 'Python', 'Apache Superset', 'PostgreSQL', 'Redis', 'Docker'],
  array['react', 'python', 'analytics', 'featured'],
  now() - interval '18 days'
),
(
  '🤖', 'HelpDesk AI Assistant', false,
  'Chatbot cerdas untuk self-service IT helpdesk berbasis LLM',
  'Sistem AI assistant yang dapat menjawab 80% pertanyaan helpdesk secara otomatis. Dibangun menggunakan RAG (Retrieval Augmented Generation) dengan knowledge base dari 5.000+ dokumentasi internal. Berhasil mengurangi tiket helpdesk sebesar 60% dalam 3 bulan pertama.',
  'AI & ML', 'live', 'IT Operations', null,
  array['Hendri B.', 'Maya S.', 'Dodi K.'],
  array['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Vue.js', 'Pinecone'],
  array['ai', 'llm', 'chatbot', 'automation'],
  now() - interval '25 days'
),
(
  '🛡️', 'SecureVault SSO', false,
  'Single Sign-On terpusat dengan zero-trust security architecture',
  'Implementasi SSO internal menggunakan OpenID Connect dan OAuth 2.0. Mendukung MFA, device management, dan audit trail lengkap. Terintegrasi dengan 35+ aplikasi internal dan Active Directory perusahaan.',
  'Security', 'live', 'IT Security', null,
  array['Farhan M.', 'Yanti W.', 'Bimo P.', 'Citra A.'],
  array['Keycloak', 'Java', 'Spring Boot', 'React', 'LDAP', 'PostgreSQL'],
  array['security', 'sso', 'java', 'oauth'],
  now() - interval '32 days'
),
(
  '📱', 'MobileAbsen', false,
  'Aplikasi absensi mobile dengan face recognition dan GPS verification',
  'Aplikasi absensi modern yang menggantikan sistem fingerprint konvensional. Menggunakan face recognition AI dengan akurasi 99.2% dan verifikasi GPS untuk validasi lokasi kerja. Mendukung work from home, remote, dan hybrid work policy.',
  'Mobile App', 'live', 'Mobile Development', null,
  array['Rizki P.', 'Nurul H.', 'Galih S.'],
  array['Flutter', 'TensorFlow Lite', 'Firebase', 'Go', 'PostgreSQL', 'Google Maps API'],
  array['flutter', 'ai', 'mobile', 'hr'],
  now() - interval '44 days'
),
(
  '⚡', 'AutoDeploy Pipeline', false,
  'CI/CD pipeline otomatis dengan zero-downtime deployment dan rollback instan',
  'Platform deployment internal yang memungkinkan tim developer melakukan deploy ke production dalam hitungan menit. Dilengkapi dengan automated testing, security scanning, dan rollback otomatis jika terjadi error. Sudah digunakan untuk 50+ microservices.',
  'DevOps & Tools', 'live', 'DevOps', null,
  array['Wahyu D.', 'Arief N.', 'Putri L.'],
  array['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Grafana'],
  array['devops', 'kubernetes', 'ci-cd', 'docker'],
  now() - interval '52 days'
),
(
  '🌐', 'Employee Self-Service Portal', false,
  'Portal terpadu untuk semua kebutuhan HR karyawan',
  'Web portal yang memungkinkan karyawan mengurus semua kebutuhan HR secara mandiri: pengajuan cuti, reimbursement, slip gaji, dan update data pribadi. Integrasi dengan sistem payroll dan ERP utama perusahaan.',
  'Web App', 'beta', 'IT Development', null,
  array['Hendra W.', 'Fitriani S.', 'Bambang P.', 'Nita A.'],
  array['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'AWS'],
  array['nextjs', 'typescript', 'hr', 'portal'],
  now() - interval '58 days'
),
(
  '📦', 'Inventory Smart System', false,
  'Manajemen aset IT dengan QR code scanning dan prediksi lifecycle',
  'Sistem manajemen inventaris IT yang menggunakan QR code untuk tracking aset secara real-time. Dilengkapi dengan prediksi end-of-life aset menggunakan ML dan notifikasi otomatis untuk maintenance schedule.',
  'Internal Tools', 'beta', 'IT Procurement', null,
  array['Dimas R.', 'Eka P.'],
  array['Laravel', 'Vue.js', 'MySQL', 'Python', 'TensorFlow', 'Redis'],
  array['laravel', 'vuejs', 'inventory', 'ml'],
  now() - interval '74 days'
),
(
  '🔍', 'Log Analytics Platform', false,
  'Centralized log management dengan real-time alerting dan anomaly detection',
  'Platform agregasi dan analisis log dari seluruh infrastruktur. Menggunakan ELK Stack yang dikustomisasi dengan machine learning untuk deteksi anomali dan alerting proaktif. Memproses 10+ juta log events per hari.',
  'DevOps & Tools', 'dev', 'IT Infrastructure', null,
  array['Fikri A.', 'Sekar W.', 'Panji D.'],
  array['Elasticsearch', 'Logstash', 'Kibana', 'Python', 'Apache Kafka', 'Grafana'],
  array['elk', 'monitoring', 'devops', 'kafka'],
  now() - interval '82 days'
);

-- ── INSERT SAMPLE COMMENTS ──
insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Budi S.', 'BS', '#3b82f6',
  'Mantap banget! Fitur drill-down nya sangat membantu tim finance.',
  now() - interval '2 hours'
from public.projects p where p.name = 'BI Dashboard v3';

insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Rina P.', 'RP', '#10b981',
  'Dashboard ini benar-benar game changer untuk laporan bulanan kita.',
  now() - interval '5 hours'
from public.projects p where p.name = 'BI Dashboard v3';

insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Andi P.', 'AP', '#8b5cf6',
  'Wow ini luar biasa! Sudah coba dan jawaban nya sangat akurat.',
  now() - interval '1 hour'
from public.projects p where p.name = 'HelpDesk AI Assistant';

insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Lina K.', 'LK', '#ec4899',
  'Akhirnya absensi yang praktis! Gak perlu antri di mesin fingerprint lagi.',
  now() - interval '3 hours'
from public.projects p where p.name = 'MobileAbsen';

insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Tono W.', 'TW', '#f59e0b',
  'Face recognition nya cepat banget, gak sampai 1 detik.',
  now() - interval '4 hours'
from public.projects p where p.name = 'MobileAbsen';

insert into public.comments (project_id, author, avatar, color, body, created_at)
select p.id, 'Sri M.', 'SM', '#10b981',
  'Tampilan nya modern dan mudah digunakan, great work!',
  now() - interval '1 day'
from public.projects p where p.name = 'Employee Self-Service Portal';

-- ── INSERT SEED VOTES (simulasi vote count original) ──
-- BI Dashboard v3: 234 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 234) s
where p.name = 'BI Dashboard v3';

-- HelpDesk AI Assistant: 198 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 198) s
where p.name = 'HelpDesk AI Assistant';

-- SecureVault SSO: 176 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 176) s
where p.name = 'SecureVault SSO';

-- MobileAbsen: 165 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 165) s
where p.name = 'MobileAbsen';

-- AutoDeploy Pipeline: 143 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 143) s
where p.name = 'AutoDeploy Pipeline';

-- Employee Self-Service Portal: 121 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 121) s
where p.name = 'Employee Self-Service Portal';

-- Inventory Smart System: 98 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 98) s
where p.name = 'Inventory Smart System';

-- Log Analytics Platform: 87 votes
insert into public.votes (project_id, user_token)
select p.id, gen_random_uuid()
from public.projects p, generate_series(1, 87) s
where p.name = 'Log Analytics Platform';

-- ── INSERT SEED ACTIVITIES (tanpa trigger karena insert via seed) ──
insert into public.activities (text, created_at) values
('<span class="activity-bold">Ahmad F.</span> submit project baru: <span class="activity-bold">BI Dashboard v3</span>', now() - interval '5 minutes'),
('<span class="activity-bold">Rina P.</span> upvote <span class="activity-bold">HelpDesk AI Assistant</span>', now() - interval '12 minutes'),
('<span class="activity-bold">Budi S.</span> comment di <span class="activity-bold">BI Dashboard v3</span>', now() - interval '1 hour'),
('<span class="activity-bold">Maya S.</span> submit project: <span class="activity-bold">MobileAbsen</span>', now() - interval '2 hours'),
('<span class="activity-bold">Wahyu D.</span> update status <span class="activity-bold">AutoDeploy Pipeline</span>', now() - interval '3 hours');
