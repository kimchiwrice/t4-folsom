# =============================================
# T4 FOLSOM — CINEMATIC IMAGE GENERATOR
# Generates all website images using Nano Banana 2
# =============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " T4 FOLSOM - IMAGE GENERATOR" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create images folder
$imgDir = "C:\Users\Sean T\trinh-media\t4-folsom\images"
mkdir -Force $imgDir | Out-Null
Write-Host "Output folder: $imgDir" -ForegroundColor Gray
Write-Host ""

# --- IMAGE 1: HERO ---
Write-Host "[1/6] Generating HERO image..." -ForegroundColor Yellow
nano-banana "cinematic close-up of a taro boba milk tea drink in a clear plastic cup, purple gradient liquid with dark brown tapioca pearls visible at bottom, condensation droplets on cup surface, dramatic side lighting with warm amber key light and cool teal fill light, shallow depth of field, dark moody background with soft golden bokeh lights, commercial product photography, ultra photorealistic, 8K detail" -o hero -s 2K -a 16:9 -d $imgDir
Write-Host "  HERO done!" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 5

# --- IMAGE 2: ABOUT SECTION ---
Write-Host "[2/6] Generating ABOUT image..." -ForegroundColor Yellow
nano-banana "cinematic interior photograph of a modern cozy boba tea shop, warm ambient lighting with teal neon accent glow and amber pendant lights, comfortable booth seating with customers in soft focus background, clean minimalist design with light wood tables and concrete walls, colorful boba drinks on table in foreground, golden hour light streaming through large windows, anamorphic lens flare, shallow depth of field, warm inviting atmosphere, commercial interior photography" -o about -s 2K -a 3:4 -d $imgDir
Write-Host "  ABOUT done!" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 5

# --- IMAGE 3: MENU SHOWCASE ---
Write-Host "[3/6] Generating MENU SHOWCASE image..." -ForegroundColor Yellow
nano-banana "cinematic overhead flat-lay of five colorful boba tea drinks arranged artfully on a dark slate surface, drinks include purple taro milk tea, green matcha latte, orange mango fruit tea, dark brown sugar boba latte, and pink strawberry smoothie, each with colorful tapioca pearls and paper straws, fresh fruit garnishes scattered around, dramatic top-down lighting with soft directional shadows, commercial food photography, ultra sharp detail, rich saturated colors against dark background" -o menu-showcase -s 2K -a 16:9 -d $imgDir
Write-Host "  MENU SHOWCASE done!" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 5

# --- IMAGE 4: BOBA TEXTURE ---
Write-Host "[4/6] Generating BOBA TEXTURE image..." -ForegroundColor Yellow
nano-banana "extreme macro close-up of glossy dark brown tapioca boba pearls glistening with golden brown sugar syrup, shallow depth of field with beautiful creamy bokeh, dramatic side lighting creating bright specular highlights on each spherical pearl surface, dark black background, shot with macro lens, commercial food photography, ultra photorealistic, warm amber color grade, studio lighting" -o boba-texture -s 2K -a 21:9 -d $imgDir
Write-Host "  BOBA TEXTURE done!" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 5

# --- IMAGE 5: POPCORN CHICKEN ---
Write-Host "[5/6] Generating POPCORN CHICKEN image..." -ForegroundColor Yellow
nano-banana "cinematic close-up of crispy golden fried popcorn chicken pieces piled in a modern paper container, visible steam rising, dramatic side lighting with warm golden key light creating highlights on crispy breading texture, dark moody background with soft teal accent light on the left, garnished with sliced green onion and red chili flakes, commercial food photography, shallow depth of field, ultra photorealistic, appetizing warm tones" -o popcorn-chicken -s 2K -a 1:1 -d $imgDir
Write-Host "  POPCORN CHICKEN done!" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 5

# --- IMAGE 6: BROWN SUGAR POUR ---
Write-Host "[6/6] Generating BROWN SUGAR POUR image..." -ForegroundColor Yellow
nano-banana "cinematic freeze frame of thick dark brown sugar syrup being poured and drizzling into a clear glass of fresh white milk creating beautiful amber caramel swirl patterns, dark tapioca boba pearls sitting at the bottom of the glass, dramatic warm backlight creating a golden rim glow on the glass edge, pure black background, commercial beverage photography, ultra photorealistic, warm rich color grade, high speed photography style" -o brown-sugar-pour -s 2K -a 4:5 -d $imgDir
Write-Host "  BROWN SUGAR POUR done!" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ALL 6 IMAGES GENERATED!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Images saved to: $imgDir" -ForegroundColor White
Write-Host ""
Write-Host "Files created:" -ForegroundColor Gray
ls $imgDir
