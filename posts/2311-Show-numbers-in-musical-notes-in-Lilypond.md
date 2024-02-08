---
title: Show numbers in musical notes in Lilypond
number: 204
url: https://github.com/King-of-Infinite-Space/thoughts/discussions/204
createdAt: 2023-11-21T01:45:53Z
lastEditedAt: 2024-02-07T23:07:23Z
updatedAt: 2024-02-07T23:07:23Z
author: King-of-Infinite-Space
category: 博文
labels:
  - 赛博空间
  - 数理小径
  - EN
countZH: 0
countEN: 490
filename: 2311-Show-numbers-in-musical-notes-in-Lilypond
_title: Show numbers in musical notes in Lilypond
_alias: note-head
_joinLines: "true"
---

<!-- _title: Show numbers in musical notes in Lilypond -->
<!-- _alias: note-head -->
<!-- _joinLines: true -->

Music is amazing but notation can be confusing. It doesn't have to be. Expressing musical notes as numbers makes the relations between them much more straightforward. As much as I want a revolutionary notation system based on 12 numbers[^1], there is currently no implementation.

As I was searching for techincal solutions, I came across [this blog post](https://blog.csdn.net/qq_36822973/article/details/130724932) which included [a snippet from Lilypond documentation](https://lilypond.org/doc/v2.25/Documentation/notation/easy-notation-note-heads). Lilypond is an open-source software for making sheet music based on text[^2]. It supports adding note names (A\~G) to note heads. In particular, the snippet shows how the note heads could be customized to show the degrees of notes in a scale using numbers 1\~7. With some simple tweaking, I changed the numbers to 0\~11 in a chromatic scale.

----------

<img src="https://cdn.jsdelivr.net/gh/King-of-Infinite-Space/image-host/2023/ly-absolute.png" width="400px">

----------

<img src="https://cdn.jsdelivr.net/gh/King-of-Infinite-Space/image-host/2023/ly-relative.png" width="400px">

----------

Due to the small size of the note heads, the numbers are a little hard to see. But they are still very helpful as an aid for reading music or learning music theory. It could also serve as a smooth transition path to the future notation system based on numbers. This method only requires adding a few lines to existing Lilypond files, which is the simplest acceptable solution to me.

The difference between "absolute" and "relative" is equivalent to the difference between "fixed-do" and "movable-do" solfege. Piano players may prefer the "absolute" system where 0 is always C, so the numbers correspond to piano keys (irrespective of sharps or flats). The "relative" system may be more preferable for isomorphic instruments where numbers map to fingering.

Copy-paste the following code to [Hacklily](https://hacklily.org/) for demo.

``` lisp
% absolute: 0=C, relative: 0=tonic
% change to ##f for absolute numbers
relative-number = ##t

#(define Ez_numbers_engraver
   (make-engraver
    (acknowledgers
     ((note-head-interface engraver grob source-engraver)
      (let* ((context (ly:translator-context engraver))
         (tonic-pitch (ly:context-property context 'tonic))
         (tonic-number (ly:pitch-semitones tonic-pitch))
         (grob-pitch
          (ly:event-property (event-cause grob) 'pitch))
         (grob-number (ly:pitch-semitones grob-pitch))
     (delta (modulo (- grob-number (if relative-number tonic-number 0)) 12))
         (note-names
          (make-vector 12 (number->string delta))))
    (ly:grob-set-property! grob 'note-names note-names))))))

#(set-global-staff-size 36)

\layout {
  ragged-right = ##t
  \context {
    \Voice
    \consists \Ez_numbers_engraver
  }
}
\markup {
  \bold Relative (0=tonic)
}
\markup \vspace #1
\markup {
  C Major
}
\relative c' {
  \easyHeadsOn
  c4 d e f
  g4 a b c
}
\markup {
  A Major
}
\relative c' {
  \easyHeadsOn
  \key a \major
  a4 b cis d
  e4 fis gis a
}
\markup {
  D Dorian
}
\relative c' {
  \easyHeadsOn
  \key d \dorian
  d4 e f g
  a4 b c d
}
```

[^1]: Such as Carrillo notation mentioned in [this video](https://youtu.be/Eq3bUFgEcb4?si=7Q0ehUXbKAlvp6X9&t=4012), or Jianpu using 12 numbers instead of 7.

[^2]: Another great open-source option is MuseScore, which is WYSIWYG. It supports adding [note names or solfeges](https://musescore.org/en/handbook/3/notehead-schemes) to the note heads, but there seems to be no customization. Someone could make a pull request or a plugin to support numbers.

<img src="https://count.lnfinite.space/post/note-head.svg?plus=1" width="0" height="0"/>