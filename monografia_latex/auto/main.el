(TeX-add-style-hook "main"
 (lambda ()
    (TeX-add-symbols
     '("buttonred" 1)
     '("buttonblue" 1)
     '("struthis" 1)
     '("up" 1)
     "printnomenclature"
     "makenomenclature")
    (TeX-run-style-hooks
     "colortbl"
     "lastpage"
     "nomencl"
     "hyphenat"
     "hyperref"
     "url"
     "fontenc"
     "T1"
     "sty/ach2017"
     "sty/pdfcompat"
     "abntcite"
     "inputenc"
     "utf8"
     "babel"
     "brazil"
     "latex2e"
     "sty/abnt12"
     "sty/abnt"
     "12pt"
     "a4paper"
     "noindentfirst"
     "oneside"
     "openany"
     "pnumromarab"
     "ruledheader"
     "time"
     "anapcustomindent"
     "development/metodologia")))

