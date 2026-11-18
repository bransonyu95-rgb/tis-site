/* Ah Hock's face and movement on the website.
   A port of the TIS Film Kit (kit/face.py and kit/character.py) to three.js: the same model file, the same channels,
   the same poses and named faces (copied from the kit when this file is built), the same pose-to-pose snap.
   Every extra face part is made here when the page loads; the model file is not changed.
   Blender (x, y, z) is three (x, z, -y). A Blender XYZ euler (a, b, c) is a three euler (a, c, -b) in order 'YZX'. */
(function(){
'use strict';
var DATA = {"poses":{"neutral":{"head":[0,0,4],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0,8],"brow_r":[0,-8],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"desk":{"head":[0,0,4],"arm_l":[-34,0,0],"elbow_l":[-52,0,0],"arm_r":[-34,0,0],"elbow_r":[-52,0,0],"mouth":"flat","brow_l":[0,8],"brow_r":[0,-8],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"typing":{"head":[8,0,14],"arm_l":[-34,0,0],"elbow_l":[-52,0,0],"arm_r":[-34,0,0],"elbow_r":[-52,0,0],"mouth":"flat","brow_l":[-0.004,12],"brow_r":[-0.004,-12],"eyes":0.95,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"tired":{"head":[14,4,10],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.004,18],"brow_r":[-0.004,-18],"eyes":0.8,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"shock":{"head":[-8,0,-4],"arm_l":[-20,-12,0],"elbow_l":[-95,0,0],"arm_r":[-20,12,0],"elbow_r":[-95,0,0],"mouth":"open","brow_l":[0.038,14],"brow_r":[0.038,-14],"eyes":1.25,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"shrug":{"head":[0,7,0],"arm_l":[0,-15,0],"elbow_l":[0,-95,0],"arm_r":[0,15,0],"elbow_r":[0,95,0],"mouth":"flat","brow_l":[0.03,12],"brow_r":[0.03,-12],"eyes":0.92,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"point":{"head":[0,0,16],"arm_l":[0,-84,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.018,8],"brow_r":[0,0],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"smile":{"head":[-4,0,2],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"smile","brow_l":[0.012,0],"brow_r":[0.012,0],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"wave":{"head":[-4,0,6],"arm_l":[0,-38,0],"elbow_l":[0,-100,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"smile","brow_l":[0.012,0],"brow_r":[0.012,0],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"explain":{"head":[-2,0,6],"arm_l":[-18,-34,0],"elbow_l":[-58,-30,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.014,6],"brow_r":[0.006,-6],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"explain_both":{"head":[-3,0,0],"arm_l":[-18,-34,0],"elbow_l":[-58,-30,0],"arm_r":[-18,34,0],"elbow_r":[-58,30,0],"mouth":"flat","brow_l":[0.016,4],"brow_r":[0.016,-4],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"present_right":{"head":[0,0,22],"arm_l":[0,-70,0],"elbow_l":[0,-18,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.012,4],"brow_r":[0.012,-4],"eyes":1.0,"body":10,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"present_left":{"head":[0,0,-22],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,70,0],"elbow_r":[0,18,0],"mouth":"flat","brow_l":[0.012,4],"brow_r":[0.012,-4],"eyes":1.0,"body":-10,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"look_right":{"head":[2,0,30],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0,8],"brow_r":[0,-8],"eyes":1.0,"body":8,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"look_left":{"head":[2,0,-30],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0,8],"brow_r":[0,-8],"eyes":1.0,"body":-8,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"look_up":{"head":[-18,0,6],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.02,6],"brow_r":[0.02,-6],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"look_down":{"head":[18,0,4],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0,8],"brow_r":[0,-8],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"point_camera":{"head":[2,0,0],"arm_l":[-82,-8,0],"elbow_l":[-6,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.016,8],"brow_r":[0.004,-8],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"think":{"head":[8,-6,-8],"arm_l":[-52,0,-42],"elbow_l":[-122,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.02,14],"brow_r":[-0.004,-4],"eyes":0.92,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"facepalm":{"head":[22,0,0],"arm_l":[-74,0,-48],"elbow_l":[-112,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.006,16],"brow_r":[-0.006,-16],"eyes":0.6,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"proud":{"head":[-6,0,4],"arm_l":[0,-30,0],"elbow_l":[0,62,0],"arm_r":[0,30,0],"elbow_r":[0,-62,0],"mouth":"smile","brow_l":[0.014,0],"brow_r":[0.014,0],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"stop":{"head":[0,0,0],"arm_l":[-88,-10,0],"elbow_l":[-40,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.004,14],"brow_r":[-0.004,-14],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"thumbs_up":{"head":[-4,0,4],"arm_l":[-20,-52,0],"elbow_l":[-30,-96,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"smile","brow_l":[0.016,0],"brow_r":[0.016,0],"eyes":1.0,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"cheer":{"head":[-10,0,0],"arm_l":[0,-150,0],"elbow_l":[0,-12,0],"arm_r":[0,150,0],"elbow_r":[0,12,0],"mouth":"open","brow_l":[0.03,12],"brow_r":[0.03,-12],"eyes":1.12,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"worried":{"head":[8,4,-6],"arm_l":[-22,10,0],"elbow_l":[-60,0,0],"arm_r":[-22,-10,0],"elbow_r":[-60,0,0],"mouth":"flat","brow_l":[0.02,20],"brow_r":[0.02,-20],"eyes":1.05,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"deadpan":{"head":[0,0,0],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.008,0],"brow_r":[-0.008,0],"eyes":0.86,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"rant":{"head":[-6,5,0],"arm_l":[-84,-6,0],"elbow_l":[-10,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"open","brow_l":[0.03,-16],"brow_r":[0.03,16],"eyes":1.38,"body":0.0,"lean":0.0,"finger":1.0,"shout":1.9,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"rant_self":{"head":[4,-7,6],"arm_l":[-58,0,-40],"elbow_l":[-118,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"open","brow_l":[0.036,18],"brow_r":[0.012,-6],"eyes":1.3,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.7,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"rant_fists":{"head":[-12,0,0],"arm_l":[-20,-12,0],"elbow_l":[-112,0,0],"arm_r":[-20,12,0],"elbow_r":[-112,0,0],"mouth":"open","brow_l":[0.04,-10],"brow_r":[0.04,10],"eyes":1.42,"body":0.0,"lean":0.0,"finger":0.0,"shout":2.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"laugh":{"head":[-16,6,0],"arm_l":[-30,0,-30],"elbow_l":[-100,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"smile","brow_l":[0.034,8],"brow_r":[0.034,-8],"eyes":0.64,"body":0.0,"lean":0.0,"finger":0.0,"shout":2.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"inhale":{"head":[-17,0,0],"arm_l":[-8,-24,0],"elbow_l":[0,0,0],"arm_r":[-8,24,0],"elbow_r":[0,0,0],"mouth":"open","brow_l":[0.042,6],"brow_r":[0.042,-6],"eyes":0.62,"body":0.0,"lean":-7,"finger":0.0,"shout":0.42,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"intense":{"head":[10,0,0],"arm_l":[0,0,0],"elbow_l":[0,0,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.012,-14],"brow_r":[-0.012,14],"eyes":0.74,"body":0.0,"lean":6,"finger":0.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"cringe_grin":{"head":[-5,9,0],"arm_l":[-20,-52,0],"elbow_l":[-30,-96,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"smile","brow_l":[0.04,4],"brow_r":[0.04,-4],"eyes":1.36,"body":0.0,"lean":0.0,"finger":0.0,"shout":1.5,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"middle_finger":{"head":[2,0,0],"arm_l":[-8,-84,0],"elbow_l":[0,-82,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[-0.01,-12],"brow_r":[-0.01,12],"eyes":0.84,"body":0.0,"lean":0.0,"finger":1.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0},"finger_up":{"head":[-3,0,6],"arm_l":[-8,-84,0],"elbow_l":[0,-82,0],"arm_r":[0,0,0],"elbow_r":[0,0,0],"mouth":"flat","brow_l":[0.016,6],"brow_r":[0.008,-6],"eyes":1.0,"body":0.0,"lean":0.0,"finger":1.0,"shout":1.0,"flush":0.0,"leg_l":[0,0],"leg_r":[0,0],"waist":[0,0,0],"hop":0.0,"shift":0.0}},"faces":{"happy":{"m_smile":0.8,"m_open":0.25,"m_teeth":0.7,"lid_low":[0.35,0.35],"blush":0.5,"brow_l":[0.02,8],"brow_r":[0.02,-8]},"grin":{"m_smile":1.0,"m_open":0.35,"m_w":1.4,"m_teeth":1.0,"eye_style":"happy","brow_l":[0.03,8],"brow_r":[0.03,-8]},"laugh_big":{"m_smile":1.0,"m_open":0.9,"m_w":1.5,"m_teeth":0.8,"m_tongue":0.8,"eye_style":"happy","tear":[0.5,0.5],"brow_l":[0.04,10],"brow_r":[0.04,-10]},"smug":{"m_smile":0.6,"m_skew":0.7,"lid":[0.45,0.45],"look":[-0.6,0],"brow_l":[0.025,-4],"brow_r":[-0.005,10]},"wink":{"m_smile":0.8,"m_skew":0.4,"m_open":0.15,"lid":[1.0,0.0],"brow_l":[-0.01,-6],"brow_r":[0.03,-8]},"cheeky":{"m_smile":0.7,"m_open":0.25,"m_tongue_out":0.9,"lid":[1.0,0.0],"brow_l":[-0.01,-6],"brow_r":[0.03,-8]},"love":{"eye_style":"heart","eyes":1.25,"m_smile":0.9,"m_open":0.3,"blush":1.0,"brow_l":[0.035,10],"brow_r":[0.035,-10]},"sad":{"m_smile":-0.9,"lid":[0.25,0.25],"look":[0,-0.7],"tear":[0.6,0],"brow_l":[0.02,18],"brow_r":[0.02,-18]},"crying":{"m_smile":-1.0,"m_open":0.55,"m_w":1.2,"m_teeth_low":0.5,"lid":[1.0,1.0],"cry":1.0,"flush":0.25,"brow_l":[0.025,20],"brow_r":[0.025,-20]},"angry":{"m_smile":-0.7,"m_w":1.3,"m_teeth":1.0,"m_teeth_low":1.0,"lid":[0.3,0.3],"lid_tilt":[22,22],"vein":1.0,"flush":0.5,"brow_l":[-0.014,-16],"brow_r":[-0.014,16]},"furious":{"mouth":"open","shout":1.5,"m_w":1.3,"m_teeth":1.0,"m_teeth_low":0.8,"m_tongue":0.5,"lid":[0.25,0.25],"lid_tilt":[26,26],"vein":1.0,"flush":0.9,"brow_l":[-0.016,-18],"brow_r":[-0.016,18]},"determined":{"m_smile":0.35,"m_skew":0.3,"lid":[0.2,0.2],"lid_tilt":[14,14],"brow_l":[-0.012,-13],"brow_r":[-0.012,13]},"suspicious":{"m_w":0.8,"m_pos":[0.014,0],"lid":[0.5,0.5],"lid_low":[0.4,0.4],"look":[0.9,0],"brow_l":[0.03,4],"brow_r":[-0.012,12]},"side_eye":{"look":[-1.0,0],"lid":[0.3,0.3],"m_w":0.7,"m_smile":-0.2,"brow_l":[0.0,0],"brow_r":[0.0,0]},"eye_roll":{"look":[0.3,1.0],"lid":[0.3,0.3],"m_smile":-0.35,"m_pos":[-0.012,0],"brow_l":[0.03,6],"brow_r":[0.03,-6]},"sleepy":{"lid":[0.7,0.78],"m_open":0.15,"m_round":0.6,"brow_l":[0.01,12],"brow_r":[0.01,-12]},"shocked":{"eyes":1.35,"m_open":0.8,"m_round":0.6,"pale":0.6,"brow_l":[0.05,6],"brow_r":[0.05,-6]},"scared":{"eyes":1.25,"m_smile":-0.6,"m_open":0.35,"m_w":1.4,"m_teeth":1.0,"m_teeth_low":1.0,"sweat":1.0,"pale":0.8,"brow_l":[0.04,18],"brow_r":[0.04,-18],"look":[0.4,0.3]},"nervous":{"m_smile":0.5,"m_w":1.5,"m_open":0.1,"m_teeth":1.0,"m_teeth_low":1.0,"sweat":1.0,"look":[0.5,0.2],"brow_l":[0.03,16],"brow_r":[0.03,-16]},"embarrassed":{"blush":1.0,"look":[0.6,-0.6],"m_smile":0.3,"m_w":0.7,"sweat":0.7,"brow_l":[0.02,14],"brow_r":[0.02,-14]},"disgust":{"m_upper":1.0,"m_smile":-0.8,"m_skew":-0.6,"m_teeth":0.8,"lid":[0.4,0.4],"lid_low":[0.3,0.3],"nose":1.12,"brow_l":[-0.012,-14],"brow_r":[0.01,4]},"sick":{"sick":1.0,"lid":[0.5,0.5],"m_smile":-0.5,"m_skew":0.5,"m_round":0.3,"sweat":0.6,"brow_l":[0.02,16],"brow_r":[0.02,-16]},"cold":{"cold":1.0,"m_w":1.2,"m_smile":-0.3,"m_teeth":1.0,"m_teeth_low":1.0,"brow_l":[0.02,14],"brow_r":[0.02,-14]},"pout":{"m_round":0.9,"m_smile":-0.5,"blush":0.4,"lid":[0.2,0.2],"brow_l":[-0.008,-10],"brow_r":[-0.008,10]},"whistle":{"m_round":1.0,"m_open":0.25,"m_w":0.7,"look":[0.7,0.5],"brow_l":[0.03,6],"brow_r":[0.03,-6]},"dead":{"eye_style":"x","m_open":0.3,"m_tongue_out":1.0,"pale":0.5,"brow_l":[0.01,10],"brow_r":[0.01,-10]},"bliss":{"lid":[1,1],"m_smile":0.5,"blush":0.3,"brow_l":[0.024,9],"brow_r":[0.024,-9]}}};
var R = Math.PI / 180, N = 7, W0 = 0.052, T = 0.026, H = 0.10, MOUTH_Y = 1.165, FPS = 24, BLEND = 6, ARM_LAG = 2, BLINK_EVERY = 84;
var DEF = { m_w: 1, m_open: 0, m_smile: 0, m_skew: 0, m_round: 0, m_upper: 0, m_teeth: 0, m_teeth_low: 0, m_tongue: 0, m_tongue_out: 0, m_pos: [0, 0],
  look: [0, 0], eye_style: 'bead', lid: [0, 0], lid_low: [0, 0], lid_tilt: [0, 0], brow_size: [1, 1], blush: 0, tear: [0, 0], cry: 0, sweat: 0, vein: 0,
  sick: 0, cold: 0, pale: 0, squash: 1, nose: 1 };
var BASE = { head: [0, 0, 0], arm_l: [0, 0, 0], elbow_l: [0, 0, 0], arm_r: [0, 0, 0], elbow_r: [0, 0, 0], mouth: 'flat', brow_l: [0, 0], brow_r: [0, 0],
  eyes: 1, body: 0, lean: 0, shout: 1, flush: 0, hop: 0 };
var ARMS = { arm_l: 1, arm_r: 1, elbow_l: 1, elbow_r: 1 };
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
function back(t){ var s = 1.35; t = clamp(t, 0, 1) - 1; return t * t * ((s + 1) * t + s) + 1; }      /* ease out with a small overshoot */
function dup(v){ return Array.isArray(v) ? v.slice() : v; }
function copy(p){ var o = {}; for (var k in p) o[k] = dup(p[k]); return o; }
function compose(pose, face){
  var o = copy(BASE), k, P = DATA.poses[pose] || DATA.poses.neutral, F = DATA.faces[face] || {};
  for (k in DEF) o[k] = dup(DEF[k]);
  for (k in P) if (k in o) o[k] = dup(P[k]);
  for (k in F) if (k in o) o[k] = dup(F[k]);
  return o;
}
function mix(a, b, th, ta){                      /* the face and head lead, the arms follow */
  var o = {}, k, t;
  for (k in a) {
    t = ARMS[k] ? ta : th;
    if (typeof a[k] === 'string') o[k] = t > 0.35 ? b[k] : a[k];
    else if (Array.isArray(a[k])) o[k] = a[k].map(function(x, i){ return x + (b[k][i] - x) * t; });
    else o[k] = a[k] + (b[k] - a[k]) * t;
  }
  return o;
}

function build(THREE, o){
  var root = o.root, hero = o.hero, head = o.head, armL = o.armL, armR = o.armR, V3 = THREE.Vector3;
  function ob(n){ return root.getObjectByName(n); }
  function firstMesh(x){ var m = null; if (x) x.traverse(function(c){ if (!m && c.isMesh) m = c; }); return m; }
  root.updateMatrixWorld(true);

  /* elbows: the forearm and hand hang from a new pivot inside each arm (the kit's PIV_elbow_L / R) */
  function elbow(arm, sx, names){ var e = new THREE.Group(); arm.add(e); e.position.set(sx * 0.0347, -0.197, 0); e.updateMatrixWorld(true);
    names.forEach(function(n){ var c = ob(n); if (c) e.attach(c); }); return e; }
  var elL = elbow(armL, 1, ['AH_forearm_L', 'AH_hand_L']), elR = elbow(armR, -1, ['AH_forearm_R', 'AH_hand_R']);
  [hero, head, armL, armR, elL, elR].forEach(function(g){ g.rotation.order = 'YZX'; });

  /* colours: copies of the model's own materials, so nothing of his is edited */
  var headMesh = firstMesh(ob('AH_head'));
  function mk(src, rgb){ var m = src.clone(); m.flatShading = true; m.side = THREE.DoubleSide; if (rgb) m.color.setRGB(rgb[0], rgb[1], rgb[2]); m.needsUpdate = true; return m; }
  var mSkin = headMesh.material.clone(), skin = [mSkin.color.r, mSkin.color.g, mSkin.color.b];
  ['AH_head', 'AH_ear_L', 'AH_ear_R'].forEach(function(n){ var c = ob(n); if (c) c.traverse(function(x){ if (x.isMesh) x.material = mSkin; }); });
  var mLid = mk(mSkin), mDark = mk(firstMesh(ob('AH_mouth')).material), mWhite = mk(firstMesh(ob('AH_glint_L')).material), mBlack = mk(firstMesh(ob('AH_brow_L')).material);
  var mTongue = mk(mDark, [0.86, 0.27, 0.33]), mBlush = mk(mSkin, [0.93, 0.33, 0.36]), mWater = mk(mWhite, [0.30, 0.66, 1.0]), mRed = mk(mDark, [0.85, 0.06, 0.05]);
  var oldMouth = ob('AH_mouth'); if (oldMouth) oldMouth.visible = false;

  /* where the face is: the front of the head, measured once on a 1 cm grid (the kit asks the head mesh every frame) */
  var GX0 = -0.30, GY0 = 1.00, GS = 0.01, GW = 61, GH = 64, gz = new Float32Array(GW * GH), gn = new Float32Array(GW * GH * 3);
  (function(){
    var rc = new THREE.Raycaster(), dir = new V3(0, 0, -1), org = new V3(), nm = new THREE.Matrix3().getNormalMatrix(headMesh.matrixWorld);
    for (var j = 0; j < GH; j++) for (var i = 0; i < GW; i++) {
      org.set(GX0 + i * GS, GY0 + j * GS, 2); rc.set(org, dir); var h = rc.intersectObject(headMesh, false)[0], k = j * GW + i;
      if (h) { gz[k] = h.point.z; var n = h.face.normal.clone().applyMatrix3(nm).normalize(); gn[k * 3] = n.x; gn[k * 3 + 1] = n.y; gn[k * 3 + 2] = n.z; }
      else { gz[k] = NaN; gn[k * 3 + 2] = 1; }
    }
  })();
  function surf(x, y){
    var fx = clamp((x - GX0) / GS, 0, GW - 1.001), fy = clamp((y - GY0) / GS, 0, GH - 1.001), i = Math.floor(fx), j = Math.floor(fy), u = fx - i, v = fy - j;
    var a = gz[j * GW + i], b = gz[j * GW + i + 1], c = gz[(j + 1) * GW + i], d = gz[(j + 1) * GW + i + 1], z;
    if (a !== a || b !== b || c !== c || d !== d) { z = -1e9; [a, b, c, d].forEach(function(q){ if (q === q && q > z) z = q; }); if (z < -1e8) z = 0.18; }
    else z = a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
    return { z: z, k: Math.round(fy) * GW + Math.round(fx) };
  }

  /* the extra parts live in the head, in the model's own standing coordinates */
  var fr = new THREE.Group(); head.add(fr); fr.position.set(0, -head.position.y, 0);
  function add(geo, mat){ var m = new THREE.Mesh(geo, mat); m.visible = false; m.frustumCulled = false; fr.add(m); return m; }
  function strip(mat){                             /* a slab N columns wide whose points move every frame: mouth, teeth, tongue */
    var g = new THREE.BufferGeometry(), idx = [], q = function(a, b, c, d){ idx.push(a, b, c, a, c, d); };
    for (var i = 0; i < N - 1; i++) { var a = i * 4, b = a + 4; q(a, b, b + 1, a + 1); q(a + 2, b + 2, b, a); q(a + 1, b + 1, b + 3, a + 3); q(a + 3, b + 3, b + 2, a + 2); }
    q(0, 1, 3, 2); var l = (N - 1) * 4; q(l, l + 2, l + 3, l + 1);
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 12), 3)); g.setIndex(idx); return add(g, mat);
  }
  function stripSet(m, cols, show){               /* per column: x, top, bottom, front, back */
    var p = m.geometry.attributes.position.array, k = 0;
    for (var i = 0; i < cols.length; i++) { var c = cols[i];
      p[k++] = c[0]; p[k++] = c[1]; p[k++] = c[3];  p[k++] = c[0]; p[k++] = c[2]; p[k++] = c[3];
      p[k++] = c[0]; p[k++] = c[1]; p[k++] = c[4];  p[k++] = c[0]; p[k++] = c[2]; p[k++] = c[4]; }
    m.geometry.attributes.position.needsUpdate = true; m.visible = show;
  }
  function poly(pts){ var s = new THREE.Shape(); pts.forEach(function(p, i){ if (i) s.lineTo(p[0], p[1]); else s.moveTo(p[0], p[1]); }); return s; }
  function bar(a, b, w){ w = w || 0.22; var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy), nx = -dy / l * w / 2, ny = dx / l * w / 2;
    return poly([[a[0] - nx, a[1] - ny], [b[0] - nx, b[1] - ny], [b[0] + nx, b[1] + ny], [a[0] + nx, a[1] + ny]]); }
  function prism(shapes, d){ var g = new THREE.ExtrudeGeometry(shapes, { depth: d, bevelEnabled: false, curveSegments: 1 }); g.translate(0, 0, -d / 2); return g; }
  function dome(){ var g = new THREE.SphereGeometry(1, 8, 2, 0, Math.PI * 2, 0, Math.PI / 2); g.rotateX(Math.PI / 2); return add(g, mLid); }   /* half a low-poly ball, pole to the front: an eyelid */
  function drop(){ var g = new THREE.IcosahedronGeometry(1, 0), p = g.attributes.position;
    for (var i = 0; i < p.count; i++) { if (p.getY(i) > 0.99) p.setY(i, 2.3); p.setZ(i, p.getZ(i) * 0.55); } return add(g, mWater); }
  var half = [[0, -0.95], [0.95, 0.1], [1.0, 0.55], [0.65, 0.92], [0.28, 0.86], [0, 0.5]];
  function symbols(){ return {
    x: add(prism([bar([-0.8, -0.8], [0.8, 0.8]), bar([-0.8, 0.8], [0.8, -0.8])], 0.3), mBlack),
    happy: add(prism([bar([-0.9, -0.35], [0, 0.45]), bar([0, 0.45], [0.9, -0.35])], 0.3), mBlack),
    line: add(prism([bar([-0.95, 0], [0.95, 0])], 0.3), mBlack),
    heart: add(prism([poly(half), poly(half.map(function(p){ return [-p[0], p[1]]; }).reverse())], 0.3), mRed) }; }
  var hex = []; for (var a6 = 0; a6 < 6; a6++) hex.push([Math.cos(a6 * Math.PI / 3), Math.sin(a6 * Math.PI / 3) * 0.7]);
  var veinShapes = []; [-1, 1].forEach(function(qx){ [-1, 1].forEach(function(qz){ var c = [0.26 * qx, 0.26 * qz];
    veinShapes.push(bar(c, [c[0] + 0.62 * qx, c[1]], 0.2)); veinShapes.push(bar(c, [c[0], c[1] + 0.62 * qz], 0.2)); }); });

  var mouth = strip(mDark), teeth = strip(mWhite), teethLow = strip(mWhite), tongue = strip(mTongue), tongueOut = add(new THREE.BoxGeometry(1, 1, 1), mTongue);
  var S = ['L', 'R'].map(function(s, i){
    var eye = ob('AH_eye_' + s), gl = ob('AH_glint_' + s), brow = ob('AH_brow_' + s);
    return { side: i ? -1 : 1, eye: eye, gl: gl, brow: brow, e0: eye.position.clone(), es: eye.scale.clone(), g0: gl.position.clone(), gs: gl.scale.clone(),
      b0: brow.position.clone(), bs: brow.scale.clone(), c: eye.position.clone().add(head.position),
      lid: dome(), low: dome(), sym: symbols(), tear: drop(), stream: add(new THREE.BoxGeometry(1, 1, 1), mWater), blush: add(prism([poly(hex)], 0.12), mBlush) };
  });
  var sweat = drop(), vein = add(prism(veinShapes, 0.3), mRed), nose = ob('AH_nose'), noseS = nose ? nose.scale.clone() : null;
  var Z = new V3(0, 0, 1), nrm = new V3(), dv = new V3(), q1 = new THREE.Quaternion(), q2 = new THREE.Quaternion();
  function onFace(m, x, y, size, show, lift, flat){
    var s = surf(x, y); m.position.set(x, y, s.z + (lift || 0.004)); nrm.set(gn[s.k * 3], gn[s.k * 3 + 1], gn[s.k * 3 + 2]);
    m.quaternion.setFromUnitVectors(Z, nrm); m.scale.set(size, size, size * (flat || 1)); m.visible = show;
  }

  var xs = [], top = [], bot = [], F = [];
  function apply(p, blink, x){
    var i, u;
    /* ---- body, head, arms */
    var bodyYaw = R * p.body + (x.ry || 0);
    hero.rotation.set(-R * p.lean, bodyYaw + (x.spin || 0), 0); hero.position.y = Math.max(0, p.hop) + (x.hop || 0);
    head.rotation.set(R * p.head[0] + (x.gy || 0) * 0.26, clamp(R * p.head[2] + (x.lx || 0) * 0.5, -0.95 - bodyYaw, 0.95 - bodyYaw), -R * p.head[1]);
    armL.rotation.set(R * p.arm_l[0], R * p.arm_l[2], -R * p.arm_l[1]); armR.rotation.set(R * p.arm_r[0], R * p.arm_r[2], -R * p.arm_r[1]);
    elL.rotation.set(R * p.elbow_l[0], R * p.elbow_l[2], -R * p.elbow_l[1]); elR.rotation.set(R * p.elbow_r[0], R * p.elbow_r[2], -R * p.elbow_r[1]);
    /* ---- mouth: 'mouth' and 'shout' give the base, the m_ channels add to it */
    var sh = Math.max(0.3, p.shout), wide = 1 + (sh - 1) * 0.45;
    var bm = p.mouth === 'smile' ? [1.2 * wide, 0.045 * sh / H, 0.55, 0] : p.mouth === 'open' ? [0.73 * wide, (0.08 * sh - T) / H, 0, 0.25] : [1, 0, 0, 0];
    var w = Math.max(0.25, bm[0] * p.m_w), op = clamp(bm[1] + p.m_open, 0, 1.5), sm = bm[2] + p.m_smile, rd = clamp(bm[3] + p.m_round, 0, 1);
    var sk = p.m_skew, up = p.m_upper, px = p.m_pos[0], pz = p.m_pos[1], hw = W0 * w * (1 - 0.5 * rd), ex = 0.35 + 0.25 * rd;
    for (i = 0; i < N; i++) {
      u = -1 + 2 * i / (N - 1); var prof = Math.pow(Math.max(0, 1 - u * u), ex), c = 0.03 * clamp(sm + sk * u, -1.4, 1.4) * u * u;
      xs[i] = px + hw * u; top[i] = MOUTH_Y + pz + c + T / 2 + (up * 0.02 + rd * op * H * 0.3) * prof; bot[i] = MOUTH_Y + pz + c - T / 2 - op * H * prof;
      F[i] = Math.max(surf(xs[i], top[i]).z, surf(xs[i], bot[i]).z, surf(xs[i], (top[i] + bot[i]) / 2).z) + 0.012;
    }
    var cols = []; for (i = 0; i < N; i++) cols.push([xs[i], top[i], bot[i], F[i], F[i] - 0.07]); stripSet(mouth, cols, true);
    var tt = p.m_teeth, tl = p.m_teeth_low, tg = p.m_tongue, gap = []; for (i = 0; i < N; i++) gap[i] = top[i] - bot[i] - 0.006;
    cols = []; for (i = 0; i < N; i++) cols.push([xs[i], top[i] - 0.003, top[i] - 0.003 - Math.max(0.0005, Math.min(gap[i], tt * 0.03)), F[i] + 0.003, F[i] - 0.01]); stripSet(teeth, cols, tt > 0.03);
    cols = []; for (i = 0; i < N; i++) cols.push([xs[i], bot[i] + 0.003 + Math.max(0.0005, Math.min(gap[i], tl * 0.024)), bot[i] + 0.003, F[i] + 0.003, F[i] - 0.01]); stripSet(teethLow, cols, tl > 0.03);
    cols = [];
    for (i = 0; i < N; i++) {
      u = (-1 + 2 * i / (N - 1)) * 0.62; var j = (u + 1) / 2 * (N - 1), a = Math.min(N - 2, Math.floor(j)), f = j - a, lerp = function(arr){ return arr[a] + (arr[a + 1] - arr[a]) * f; };
      var zb = lerp(bot) + 0.002, room = lerp(top) - 0.004 - zb;
      cols.push([lerp(xs), zb + Math.max(0.0005, Math.min(room, tg * 0.045 * (1 - Math.pow(u / 0.62, 2) * 0.6))), zb, lerp(F) + 0.0015, lerp(F) - 0.01]);
    }
    stripSet(tongue, cols, tg > 0.03 && op > 0.08);
    var to = p.m_tongue_out, mid = N >> 1, ln = 0.075 * to;
    tongueOut.position.set(xs[mid], bot[mid] + 0.012 - ln / 2, F[mid] + 0.006); tongueOut.scale.set(0.05, Math.max(ln, 0.001), 0.02); tongueOut.visible = to > 0.03;
    /* ---- eyes, lids, tears, blush. The look is the face's own look plus where the visitor's mouse or finger is. */
    var e = p.eyes, lx = clamp(p.look[0] + (x.lx || 0) * 1.8, -1.8, 1.8), ly = clamp(p.look[1] - (x.gy || 0) * 1.8, -1.8, 1.8), style = p.eye_style, bead = style === 'bead', r = 0.046 * e;
    var cry = clamp(p.cry, 0, 1), bl = clamp(p.blush, 0, 1);
    S.forEach(function(s, n){
      s.eye.scale.copy(s.es).multiplyScalar(e); s.gl.scale.copy(s.gs).multiplyScalar(e); s.eye.visible = bead; s.gl.visible = bead;
      s.eye.position.set(s.e0.x + lx * 0.012, s.e0.y + ly * 0.010, s.e0.z); s.gl.position.set(s.g0.x + lx * 0.026, s.g0.y + ly * 0.021, s.g0.z);
      var cx = s.c.x + lx * 0.012, cy = s.c.y + ly * 0.010, cz = s.c.z, k;
      for (k in s.sym) { var m = s.sym[k]; m.position.set(cx, cy, cz + r * 0.9); m.scale.set(r, r, r * 0.6); m.visible = style === k; }
      var lid = bead ? Math.max(p.lid[n], 1 - blink) : 0, low = bead ? p.lid_low[n] : 0, tilt = R * p.lid_tilt[n] * s.side, rr = r * 1.15;
      [[s.lid, lid, 1], [s.low, low, -1]].forEach(function(t){
        var v = clamp(t[1], 0, 1), th = Math.PI - R * (t[2] > 0 ? 140 : 110) * v;
        dv.set(0, t[2] * Math.sin(th), Math.cos(th)); q1.setFromUnitVectors(Z, dv); q2.setFromAxisAngle(Z, -tilt * t[2]);
        t[0].quaternion.copy(q2).multiply(q1); t[0].position.set(cx, cy, cz); t[0].scale.set(rr, rr, rr); t[0].visible = v > 0.02;
      });
      if (lid > 0.25) s.gl.visible = false;                                    /* the glint would poke through the lid */
      var tv = clamp(p.tear[n], 0, 1); onFace(s.tear, cx + s.side * 0.018, cy - r - 0.012 - 0.045 * tv, 0.011 + 0.009 * tv, tv > 0.03, 0.008);
      var ty = cy - r * 0.9, tl2 = (ty - 1.09) * cry, yc = ty - tl2 / 2;
      s.stream.position.set(cx, yc, Math.max(surf(cx, yc).z, surf(cx, ty - tl2).z) + 0.004); s.stream.scale.set(0.022, Math.max(tl2, 0.001), 0.012); s.stream.visible = cry > 0.03;
      onFace(s.blush, s.side * 0.178, 1.228, 0.03 + 0.022 * bl, bl > 0.03, 0.0015);
      /* ---- brows */
      var bw = n ? p.brow_r : p.brow_l;
      s.brow.position.set(s.b0.x, s.b0.y + bw[0], s.b0.z); s.brow.rotation.set(0, 0, -R * bw[1]); s.brow.scale.set(s.bs.x * p.brow_size[0], s.bs.y * p.brow_size[1], s.bs.z);
    });
    var sw = clamp(p.sweat, 0, 1); onFace(sweat, -0.215, 1.47 - 0.05 * sw, 0.014 + 0.008 * sw, sw > 0.03, 0.008);
    var vn = clamp(p.vein, 0, 1); onFace(vein, 0.15, 1.50, 0.05 + 0.02 * vn, vn > 0.03, 0.006, 0.5);
    /* ---- nose, head shape, skin colour */
    if (nose) nose.scale.copy(noseS).multiplyScalar(p.nose);
    var sq = clamp(p.squash, 0.4, 1.8); head.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq));
    var fl = clamp(p.flush, 0, 1) * 0.82, col = [skin[0] + (0.78 - skin[0]) * fl, skin[1] + (0.035 - skin[1]) * fl, skin[2] + (0.02 - skin[2]) * fl];
    [[p.sick, [0.42, 0.60, 0.26]], [p.cold, [0.42, 0.58, 0.86]], [p.pale, [0.93, 0.89, 0.85]]].forEach(function(t){ var a = clamp(t[0], 0, 1) * 0.75; col = col.map(function(v, k){ return v + (t[1][k] - v) * a; }); });
    mSkin.color.setRGB(col[0], col[1], col[2]); mLid.color.setRGB(col[0], col[1], col[2]);
  }

  /* pose to pose: a change takes 6 pictures at 24 a second and overshoots a little; between changes he holds, but never freezes */
  var prev = null, cur = compose('neutral', ''), key = 'neutral|', changed = -1e9, shown = copy(cur), pose = 'neutral';
  function frame(now, x){
    var k = x.pose + '|' + (x.face || '');
    if (k !== key) { prev = copy(shown); cur = compose(x.pose, x.face); key = k; changed = now; pose = x.pose; }
    var since = (now - changed) / 1000 * FPS;
    var p = (!prev || since >= BLEND + ARM_LAG) ? copy(cur) : mix(prev, cur, back((since + 1) / BLEND), back((since + 1 - ARM_LAG) / BLEND));
    shown = copy(p);
    var t = now / 1000, f = Math.floor(t * FPS), h = p.head, blink = 1;
    h[2] += 2.0 * Math.sin(t * 2 * Math.PI * 0.6); h[1] += 1.0 * Math.sin(t * 2 * Math.PI * 0.4);                 /* a small head sway */
    if (pose === 'wave') p.elbow_l[1] += 14 * Math.sin(t * 2 * Math.PI * 2.2);
    if (pose === 'shock') { var kk = Math.max(0, 1 - since / 18); h[2] += 5 * kk * Math.sin(since * 1.9); p.body += 2.5 * kk * Math.sin(since * 1.9); }
    if (pose === 'laugh') { var b = Math.sin(t * 2 * Math.PI * 4.5); h[0] += 7 * b; p.body += 2 * b; p.lean += -4 + 3 * b; p.shout *= 0.85 + 0.25 * Math.abs(b); }
    if (pose !== 'shock' && pose !== 'facepalm' && pose !== 'laugh') { var m = f % BLINK_EVERY; if (m >= 40 && m <= 43) blink = [0.4, 0.08, 0.08, 0.5][m - 40]; }   /* a blink every 3.5 seconds */
    if (x.talk && pose !== 'laugh') p.m_open += 0.06 + 0.2 * Math.abs(Math.sin(t * 11));                           /* the mouth moves while his words change */
    apply(p, blink, x);
  }
  return { frame: frame, poses: Object.keys(DATA.poses), faces: Object.keys(DATA.faces), elbows: [elL, elR] };
}
window.TISRig = { build: build };
})();
