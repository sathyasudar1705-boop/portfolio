$path = 'c:\portfolio\style.css'
$content = [System.IO.File]::ReadAllText($path)

# 1. Replace color palette with professional deep navy/blue
$content = $content -replace '--bg-dark: #0a0a0c;', '--bg-dark: #0d1117;'
$content = $content -replace '--bg-accent: #121216;', '--bg-accent: #161b22;'
$content = $content -replace '--primary: #10b981;', '--primary: #6c63ff;'
$content = $content -replace '--secondary: #34d399;', '--secondary: #a78bfa;'
$content = $content -replace '--glass: rgba\(255, 255, 255, 0\.03\);', '--glass: rgba(255, 255, 255, 0.04);'
$content = $content -replace '--glass-border: rgba\(255, 255, 255, 0\.08\);', '--glass-border: rgba(255, 255, 255, 0.1);'

# Replace all hardcoded emerald colors with new purple/indigo
$content = $content -replace 'rgba\(16, 185, 129,', 'rgba(108, 99, 255,'

# 2. Fix resume header padding - tighter
$content = $content -replace 'padding: 120px 0 60px;', 'padding: 100px 0 40px;'

# 3. Fix resume-grid gap
$content = $content -replace '(\.resume-grid \{[^}]*?)gap: 3rem;', '${1}gap: 2rem;'
$content = $content -replace '(\.resume-grid \{[^}]*?)margin-bottom: 3rem;', '${1}margin-bottom: 0;'

# 4. Fix resume-bio margin
$content = $content -replace '(\.resume-bio \{[^}]*?)margin-bottom: 3rem;', '${1}margin-bottom: 2rem;'
$content = $content -replace '(\.resume-bio \{[^}]*?)padding: 2rem 2\.5rem;', '${1}padding: 1.5rem 2rem;'

# 5. Fix resume-bottom-row gap
$content = $content -replace '(\.resume-bottom-row \{[^}]*?)gap: 2\.5rem;', '${1}gap: 2rem;'

# 6. Tighter section-padding
$content = $content -replace '(\.section-padding \{[^}]*?)padding: 100px 0;', '${1}padding: 80px 0;'

[System.IO.File]::WriteAllText($path, $content)
Write-Host 'Colors and gaps updated.'
