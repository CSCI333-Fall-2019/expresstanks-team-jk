
var tankWidth = 20;
var tankHeight = 30;
var id = '';

// A Tank Class
function Tank(startPos, tankColor, newtankid, playerName) {
    this.pos = startPos.copy();
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;
    this.destroyed = false;
    this.tankColor = tankColor;
    this.tankid = newtankid;
    this.playerName = playerName;
    this.health = 100;
    //####################################### Nic
    this.healthGreen = 255;
    this.healthRed = 0;
    this.strokeColor = 'white';
    this.textColor = 'white';
    this.infoColor = 'black';
    this.transparency = 0;
    this.barTransparency = 127;
    this.winTransparency = 0;
    this.wtransparency = 0;
    //######################################## End

    // For an optional boost feature
    this.boosting = function(b) {
      this.isBoosting = b;
    }
  
    this.boost = function() {
      var force = p5.Vector.fromAngle(this.heading);
      this.vel.add(force);
    }
   

    // Render - to render the tank to the screen
    this.render = function() {
      push();

      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI / 2);
      
      if(this.destroyed) {
        // Show destroyed tank
        fill('red');
        ellipse(0, 0, 40, 40);
      }
      else {  // Draw Tank
        if(this.tankid==mytankid)
          stroke('white');
        else
          stroke('gray');
        strokeWeight(2);
        fill(this.tankColor);
        rect(0, 0, tankWidth, tankHeight);
        ellipse(0, -3, 14, 18);
        rect(0, -20, 4, 20);
        strokeWeight(6);
        point(0, 0);
      }
      pop();

      push();
      translate(this.pos.x, this.pos.y);
      fill(this.tankColor);
      textAlign(CENTER);
      if(DEBUG && DEBUG==1)
        text(this.tankid, 0, 30);
      else
        text(this.playerName, 0, 30);
      pop();

       //##################### Nic 11/20 ########################################################### 
        // Draw health bar
        push();     

        //If it's my tank, draw the health bar at the bottom of screen.
        if(this.tankid==mytankid) {
          translate(win.width * 0.5 - 200, win.height * 0.5 + 200);
          stroke(this.strokeColor);

          rectMode(CORNER);       
          fill(0, 0, 0, this.barTransparency);
          strokeWeight(1);
          rect(0, 0, 500, 20, 9); 
          fill(255);
  
          rectMode(CORNER);
          stroke(255, 255, 255, this.barTransparency);
          //Make bar 50% transparent to avoid blocking tanks on screen
          fill(this.healthRed, this.healthGreen, 0, 127);
          strokeWeight(0);
          rect(0, 0, this.health * 5, 4 *5, 9); 
          fill(this.textColor);
          textSize(18);
          text(this.health, 250, 11);
          pop();

        }

        //################### Josh #####################################
        //If it's enemy tank, draw health bar over the tank
        else {
        translate(this.pos.x - 17, this.pos.y - 25);
        stroke(255, 255, 255, this.barTransparency);
        
        rectMode(CORNER);        
        fill(0, 0, 0, this.barTransparency);
        strokeWeight(1);
        rect(0, 0, 50, 4, 9); 
        fill(255);

        rectMode(CORNER);
        stroke(this.strokeColor);
        fill(this.healthRed, this.healthGreen, 0, this.barTransparency);
        strokeWeight(0);
        rect(0, 0, this.health * 0.5, 4, 9);
        fill(255, 255, 255, this.barTransparency);
        text(this.health, 0, -4);
        pop();
        }          
     
        //######################################################## Nic
        //Display Info on screen if you've been killed
        push()
        translate(win.width * 0.5, win.height * 0.5);
        if(this.tankid==mytankid) {
          if (this.health <= 0) {
            //If tank is destroyed, make the message visible for the client killed
            this.transparency = 255;                 
          }
        }
        else {
          this.transparency = 0;
        }  
            
        fill(this.healthRed, 0, 0, this.transparency);
        strokeWeight(5);
        textSize(72);
        textAlign(CENTER);
        text('YOU DIED!', 0, -200);
        pop();


        
        //Display Info on screen if you've won
        push()
        translate(win.width * 0.5, win.height * 0.5);
        var count = 0;
        var count2 = 0;
        
        for (var t = tanks.length - 1; t >= 0; t--) {
          count2++;
          if (!tanks[t].destroyed){
            id == tanks[t].tankid;
             count++;
          }
          }

        if (count === 1 && count2 !== 1 && this.health !== 0 && this.tankid === mytankid) {
            this.wGreen = 255;
            this.wtransparency = 255; 
        }

        else {
            this.wGreen = 0;
            this.wtransparency = 0;
        }  

        //################################################## Josh
        fill(0, this.wGreen, 0, this.wtransparency);
        strokeWeight(5);
        textSize(72);
        textAlign(CENTER);
        text('YOU WON!', 0, 100);
        pop();
              

// ########################################################################## End of Nic & Josh

     
        
    }     
    // Moving tank
    this.moveForward = function(a) {
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(a);
      this.vel.add(force);
    }

    this.stopMotion = function() {
      this.vel.x = 0;
      this.vel.y = 0;
      this.vel.z = 0;
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }
    
    this.turn = function() {
        this.heading += this.rotation;
    }

    // Update its forward and backward motion
    this.update = function() {
      if (this.isBoosting) {
        this.boost();
      }
      this.pos.add(this.vel);
    }
}