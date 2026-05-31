Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param (
        [string]$SourcePath,
        [string]$DestPath,
        [int]$Width,
        [int]$Height
    )
    $srcImg = [System.Drawing.Image]::FromFile($SourcePath)
    $destImg = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($destImg)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.DrawImage($srcImg, 0, 0, $Width, $Height)
    
    $destImg.Save($DestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $destImg.Dispose()
    $srcImg.Dispose()
}

$source = "c:\Users\sss\Desktop\chat\photo\easy\1.jpg"
$resDir = "c:\Users\sss\Desktop\chat\android\app\src\main\res"

$sizes = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

foreach ($folder in $sizes.Keys) {
    $size = $sizes[$folder]
    
    # Ensure folder exists
    $dirPath = "$resDir\$folder"
    if (-not (Test-Path $dirPath)) {
        New-Item -ItemType Directory -Path $dirPath -Force | Out-Null
    }
    
    $destFile = "$dirPath\ic_launcher.png"
    $destFileRound = "$dirPath\ic_launcher_round.png"
    
    # Delete existing if any
    if (Test-Path $destFile) { Remove-Item $destFile -Force }
    if (Test-Path $destFileRound) { Remove-Item $destFileRound -Force }
    
    Resize-Image -SourcePath $source -DestPath $destFile -Width $size -Height $size
    Resize-Image -SourcePath $source -DestPath $destFileRound -Width $size -Height $size
    
    Write-Host "Создана иконка: $folder (размер $size x $size)"
}

# Also handle adaptive XML launcher for Android 8+
$adaptiveDir = "$resDir\mipmap-anydpi-v26"
if (Test-Path $adaptiveDir) {
    # Remove adaptive XML which overrides our PNG icons on Android 8+
    Remove-Item "$adaptiveDir\ic_launcher.xml" -Force -ErrorAction SilentlyContinue
    Remove-Item "$adaptiveDir\ic_launcher_round.xml" -Force -ErrorAction SilentlyContinue
    Write-Host "Удалены XML оверлеи для совместимости с PNG иконками"
}
