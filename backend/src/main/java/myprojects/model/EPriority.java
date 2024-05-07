package myprojects.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EPriority {
    HIGH_URGENT("High & Urgent"),
    HIGH_NOT_URGENT("High & Not Urgent"),
    LOW_URGENT("Low & Urgent"),
    LOW_NOT_URGENT("Low & Not Urgent");

    private final String label;

    EPriority(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }
}
