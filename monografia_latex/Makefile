#!/usr/bin/make -f

BIBTEX		?= yes
PDFLATEX	?= yes

ifeq ($(PDFLATEX), yes)
FORMAT	?= pdf
else
FORMAT	?= dvi
endif

MAIN	?= main
OUTPUT	?= $(MAIN).$(FORMAT)

TEX_FILES=$(shell find -type f -name '*.tex')

all: $(OUTPUT)

%.dvi: %.tex $(TEX_FILES)
	# Generate the .aux file, used by bibtex (see below).
	latex -interaction batchmode $<
ifeq ($(BIBTEX), yes)
	# Generate the .bbl file for the bibligraphy.
	bibtex $(subst .dvi,,$@)
endif
	# To handle a possible bug in abntcite.sty.
	[ ! -f $(subst .dvi,.bbl,$@) ] || \
	sed 's|^\\providecommand{\\abntrefinfo}|\\renewcommand{\\abntrefinfo}|g' -i $(subst .dvi,.bbl,$@)
	# Generate the .nls file for the nomenclature.
	[ ! -f $(subst .dvi,.nlo,$@) ] || \
	makeindex $(subst .dvi,.nlo,$@) -s nomencl.ist -o $(subst .dvi,.nls,$@)
	# Generate the .ind file for the subject index.
	[ ! -f $(subst .dvi,.idx,$@) ] || makeindex $(subst .dvi,.idx,$@)
	# Run again, to incorporate the changes in the bibliography.
	latex -interaction batchmode $<
	# Additional run in order to get the citations right.
	latex -interaction batchmode $<
ifeq ($(NOCITE), yes)
	mv $(subst .tex,.bbl,$<) $(subst .tex,.nocite.tex,$<)
endif

# Get the PDF file by compilation of the source code.
ifeq ($(PDFLATEX), yes)
%.pdf: %.tex $(TEX_FILES)
	# Generate the .aux file, used by bibtex (see below).
	latex -interaction batchmode $<
ifeq ($(BIBTEX), yes)
	# Generate the .bbl file for the bibligraphy.
	bibtex $(subst .pdf,,$@)
endif
	# To handle a possible bug in abntcite.sty.
	[ ! -f $(subst .pdf,.bbl,$@) ] || \
	sed 's|^\\providecommand{\\abntrefinfo}|\\renewcommand{\\abntrefinfo}|g' -i $(subst .pdf,.bbl,$@)
	# Generate the .nls file for the nomenclature.
	[ ! -f $(subst .pdf,.nlo,$@) ] || \
	makeindex $(subst .pdf,.nlo,$@) -s nomencl.ist -o $(subst .pdf,.nls,$@)
	# Generate the .ind file for the subject index.
	[ ! -f $(subst .pdf,.idx,$@) ] || makeindex $(subst .pdf,.idx,$@)
	# Run again, to incorporate the changes in the bibliography.
	latex -interaction batchmode $<
	# A second (and final) run to get the citations right.
	latex -interaction batchmode $<
ifeq ($(NOCITE), yes)
	mv $(subst .tex,.bbl,$<) $(subst .tex,.nocite.tex,$<)
endif
# Just use the dvipdf utility to convert the DVI format to a PDF one.
else
%.pdf: %.dvi
	dvipdf $<
endif

# Compilate the TeX code.
latex: $(MAIN).tex $(TEX_FILES)
	latex -interaction batchmode $<

# Generate the .bbl file for the bibligraphy.
bibtex: $(MAIN).tex $(TEX_FILES)
	bibtex $(MAIN)
	bibtex $(MAIN)
	# To handle a possible bug in abntcite.sty:
	sed 's|^\\providecommand{\\abntrefinfo}|\\renewcommand{\\abntrefinfo}|g' -i $(MAIN).bbl

# Generate the .nls file for the nomenclature.
nomencl: $(MAIN).tex $(TEX_FILES)
	makeindex $(MAIN).nlo -s nomencl.ist -o $(MAIN).nls

# Generate the .ind file for the subject index.
index: $(MAIN).tex $(TEX_FILES)
	makeindex $(MAIN).idx

# Remove everything but the .bbl and .pdf files.
clean:
	for x in $(shell find -type d|grep -v auto$); do \
		cd $$x; \
		$(RM) *~ *.aux *.log *.blg *.toc *.lot *.lof *.out *.brf *.idx *.ind *.nlo *.nls *.ilg;  \
		$(RM) -r auto; \
		cd - >/dev/null; \
	done

# Remove everything, really.
very-clean: clean
	$(RM) *.bbl *.dvi *.ps *.pdf
