# Keeps shoes opaque and retains the original shadows at a softer opacity.
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Text;
public static class Con1Mask {
    public static string Build(string path) {
        using (var image = new Bitmap(path)) {
            int w=image.Width, h=image.Height;
            int[] edge=new int[w];
            for(int x=0;x<w;x++) {
                edge[x]=(int)(h*.45);
                for(int y=h-1;y>=h*.45;y--) {
                    var p=image.GetPixel(x,y);
                    int chroma=Math.Max(p.R,Math.Max(p.G,p.B))-Math.Min(p.R,Math.Min(p.G,p.B));
                    if(p.A>128 && chroma>8) { edge[x]=y; break; }
                }
            }
            var points=new StringBuilder("0,0 "+w+",0 ");
            for(int x=w-1;x>=0;x--) {
                int boundary=edge[x];
                for(int n=Math.Max(0,x-3);n<=Math.Min(w-1,x+3);n++) boundary=Math.Max(boundary,edge[n]);
                points.Append(x).Append(',').Append(Math.Min(h,boundary+1)).Append(' ');
            }
            return "<svg preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+h+"' viewBox='0 0 "+w+" "+h+"'><defs><filter id='soft' x='-2%' y='-2%' width='104%' height='104%'><feGaussianBlur stdDeviation='0.8'/></filter></defs><rect width='100%' height='100%' fill='white' opacity='0.035'/><polygon points='"+points+"' fill='white' filter='url(#soft)'/></svg>";
        }
    }
}
"@
$assetDirectory = Join-Path $PSScriptRoot '../images/con1'
Get-ChildItem $assetDirectory -Filter *.png | Where-Object { $_.Name -ne 'logo-yellow.png' } | ForEach-Object {
        $displayMask = [Con1Mask]::Build($_.FullName)
    Set-Content -Encoding utf8 -LiteralPath (Join-Path $_.DirectoryName ($_.BaseName + '-mask.svg')) -Value $displayMask
    $shadowMask = $displayMask.Replace("opacity='0.035'", "opacity='1'").Replace("' fill='white' filter=", "' fill='black' filter=")
    Set-Content -Encoding utf8 -LiteralPath (Join-Path $_.DirectoryName ($_.BaseName + '-shadow-mask.svg')) -Value $shadowMask
}





# Add a continuous, soft contact shadow following the existing sole outline.
Get-ChildItem $assetDirectory -Filter '*-mask.svg' | Where-Object { $_.Name -notlike '*-shadow-mask.svg' } | ForEach-Object {
    [xml]$maskXml = Get-Content -Raw $_.FullName
    $maskWidth = [double]$maskXml.svg.width
    $maskHeight = [double]$maskXml.svg.height
    $outline = $maskXml.svg.polygon.points.Trim().Split(' ')
    $shadowPath = [System.Text.StringBuilder]::new()
    $drawingShadow = $false
    foreach ($point in $outline | Select-Object -Skip 2) {
        $coords = $point.Split(',')
        $pointX = [double]$coords[0]
        $pointY = [double]$coords[1]
        if ($pointY -gt ($maskHeight * .45 + 7)) {
            $segment = if ($drawingShadow) { ' L ' } else { ' M ' }
            [void]$shadowPath.Append($segment + $pointX + ',' + ($pointY + 4))
            $drawingShadow = $true
        } else { $drawingShadow = $false }
    }
    $shadowSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' width='$maskWidth' height='$maskHeight' viewBox='0 0 $maskWidth $maskHeight'><defs><filter id='blur' x='-20%' y='-100%' width='140%' height='300%'><feGaussianBlur stdDeviation='5'/></filter></defs><path d='$shadowPath' fill='none' stroke='#777' stroke-opacity='.45' stroke-width='14' stroke-linecap='round' stroke-linejoin='round' filter='url(#blur)'/></svg>"
    Set-Content -Encoding utf8 -LiteralPath ($_.FullName.Replace('-mask.svg', '-contact-shadow.svg')) -Value $shadowSvg
}
