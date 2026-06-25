package main.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "profile")
public class Profile {

    @Id
    private String id;

    @Indexed(name = "user_profile_idx", unique = true)
    @Field(name = "user_id")
    private long userId;

    @Field(name = "total_paid")
    private BigDecimal totalPaid;

    private String cartNumber;

    @Indexed
    private String phoneNumber;

    @Indexed
    private int age;

    @Indexed
    private double weight;

    @Indexed
    private double height;

    @Indexed
    private String size;

    @Indexed
    @Field(name = "user_note")
    private String userNote;

    @Indexed
    @Field(name = "coach_note")
    private String coachNote;

    @Indexed(name = "created_at_profile_idx")
    @Field(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Field(name = "updated_at")
    private LocalDateTime updatedAt;

    @Field(name = "deleted_at")
    private LocalDateTime deletedAt;
}
